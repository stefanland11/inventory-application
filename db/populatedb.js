const { Client } = require('pg');

const client = new Client({
    user: 'stefanland', // replace with your PostgreSQL username
    host: 'localhost',
    database: 'game_inventory',
    password: 'pass', // replace with your PostgreSQL password
    port: 5432,
});

async function populateDatabase() {
    try {
        await client.connect();

        // Create tables
        await client.query(`
            CREATE TABLE IF NOT EXISTS developers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS genre (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS platform (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS games (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                developer_id INT REFERENCES developers(id),
                genre_id INT REFERENCES genre(id),
                platform_id INT REFERENCES platform(id)
            );
        `);

        // Insert developers
        const developers = [
            'Naughty Dog',
            'Rockstar Games',
            'Nintendo',
            'Valve',
            'CD Projekt Red',
            'Electronic Arts',
            'Bungie',
            'Square Enix',
            'Activision',
            'Ubisoft'
        ];
        const developerPromises = developers.map(name => 
            client.query('INSERT INTO developers (name) VALUES ($1) RETURNING id', [name])
        );
        const developerResults = await Promise.all(developerPromises);
        const developerIds = developerResults.map(result => result.rows[0].id);

        // Insert genres
        const genres = [
            'Action',
            'Adventure',
            'Role-Playing',
            'Shooter',
            'Simulation',
            'Sports',
            'Puzzle',
            'Platformer'
        ];
        const genrePromises = genres.map(name => 
            client.query('INSERT INTO genre (name) VALUES ($1) RETURNING id', [name])
        );
        const genreResults = await Promise.all(genrePromises);
        const genreIds = genreResults.map(result => result.rows[0].id);

        // Insert platforms
        const platforms = [
            'PC',
            'PlayStation 5',
            'Xbox Series X',
            'Nintendo Switch',
            'PlayStation 4',
            'Xbox One'
        ];
        const platformPromises = platforms.map(name => 
            client.query('INSERT INTO platform (name) VALUES ($1) RETURNING id', [name])
        );
        const platformResults = await Promise.all(platformPromises);
        const platformIds = platformResults.map(result => result.rows[0].id);

        // Insert games
        const games = [
            { title: 'The Last of Us Part II', developer_id: developerIds[0], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Grand Theft Auto V', developer_id: developerIds[1], genre_id: genreIds[0], platform_id: platformIds[1] },
            { title: 'The Legend of Zelda: Breath of the Wild', developer_id: developerIds[2], genre_id: genreIds[1], platform_id: platformIds[3] },
            { title: 'Half-Life 2', developer_id: developerIds[3], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'The Witcher 3: Wild Hunt', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'FIFA 22', developer_id: developerIds[5], genre_id: genreIds[5], platform_id: platformIds[1] },
            { title: 'Halo: Combat Evolved', developer_id: developerIds[6], genre_id: genreIds[3], platform_id: platformIds[4] },
            { title: 'Final Fantasy VII', developer_id: developerIds[7], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Call of Duty: Warzone', developer_id: developerIds[8], genre_id: genreIds[3], platform_id: platformIds[5] },
            { title: 'Assassin\'s Creed Valhalla', developer_id: developerIds[9], genre_id: genreIds[1], platform_id: platformIds[4] },
            { title: 'Super Mario Odyssey', developer_id: developerIds[2], genre_id: genreIds[7], platform_id: platformIds[3] },
            { title: 'God of War', developer_id: developerIds[0], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Overwatch', developer_id: developerIds[3], genre_id: genreIds[3], platform_id: platformIds[0] },
            { title: 'Animal Crossing: New Horizons', developer_id: developerIds[2], genre_id: genreIds[1], platform_id: platformIds[3] },
            { title: 'Dark Souls', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Portal 2', developer_id: developerIds[3], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'Madden NFL 22', developer_id: developerIds[5], genre_id: genreIds[5], platform_id: platformIds[4] },
            { title: 'Tetris', developer_id: developerIds[2], genre_id: genreIds[6], platform_id: platformIds[3] },
            { title: 'Street Fighter V', developer_id: developerIds[8], genre_id: genreIds[0], platform_id: platformIds[5] },
            { title: 'Final Fantasy XV', developer_id: developerIds[7], genre_id: genreIds[2], platform_id: platformIds[4] },
            { title: 'The Elder Scrolls V: Skyrim', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Bloodborne', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Spider-Man', developer_id: developerIds[0], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Rocket League', developer_id: developerIds[3], genre_id: genreIds[5], platform_id: platformIds[0] },
            { title: 'Hades', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Stardew Valley', developer_id: developerIds[2], genre_id: genreIds[5], platform_id: platformIds[0] },
            { title: 'Minecraft', developer_id: developerIds[3], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Dark Souls III', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Ghost of Tsushima', developer_id: developerIds[0], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Monster Hunter: World', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Persona 5', developer_id: developerIds[7], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Celeste', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Valorant', developer_id: developerIds[3], genre_id: genreIds[3], platform_id: platformIds[0] },
            { title: 'Doom Eternal', developer_id: developerIds[6], genre_id: genreIds[3], platform_id: platformIds[0] },
            { title: 'Genshin Impact', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'The Legend of Zelda: Ocarina of Time', developer_id: developerIds[2], genre_id: genreIds[1], platform_id: platformIds[3] },
            { title: 'Final Fantasy X', developer_id: developerIds[7], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Bioshock Infinite', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Street Fighter IV', developer_id: developerIds[8], genre_id: genreIds[0], platform_id: platformIds[5] },
            { title: 'Red Dead Redemption 2', developer_id: developerIds[1], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Cyberpunk 2077', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Among Us', developer_id: developerIds[3], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'Cuphead', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'The Binding of Isaac: Rebirth', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Death Stranding', developer_id: developerIds[0], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Resident Evil 2', developer_id: developerIds[4], genre_id: genreIds[0], platform_id: platformIds[1] },
            { title: 'Sekiro: Shadows Die Twice', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Mass Effect 2', developer_id: developerIds[6], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Ori and the Will of the Wisps', developer_id: developerIds[2], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Hollow Knight', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Skullgirls', developer_id: developerIds[8], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'Nier: Automata', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Dying Light', developer_id: developerIds[3], genre_id: genreIds[0], platform_id: platformIds[1] },
            { title: 'Monster Hunter Rise', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[3] },
            { title: 'Little Nightmares', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Ghost Recon: Wildlands', developer_id: developerIds[9], genre_id: genreIds[0], platform_id: platformIds[5] },
            { title: 'Forza Horizon 4', developer_id: developerIds[5], genre_id: genreIds[5], platform_id: platformIds[4] },
            { title: 'Hitman 3', developer_id: developerIds[8], genre_id: genreIds[0], platform_id: platformIds[5] },
            { title: 'Fall Guys', developer_id: developerIds[3], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Borderlands 3', developer_id: developerIds[8], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Ghost of Tsushima: Legends', developer_id: developerIds[0], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Kingdom Hearts III', developer_id: developerIds[7], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'The Outer Worlds', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Rage 2', developer_id: developerIds[4], genre_id: genreIds[3], platform_id: platformIds[1] },
            { title: 'Fallout 4', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'Planet Coaster', developer_id: developerIds[2], genre_id: genreIds[5], platform_id: platformIds[0] },
            { title: 'Elden Ring', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Wasteland 3', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[0] },
            { title: 'CyberConnect2', developer_id: developerIds[6], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'It Takes Two', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Psychonauts 2', developer_id: developerIds[3], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Returnal', developer_id: developerIds[0], genre_id: genreIds[3], platform_id: platformIds[1] },
            { title: 'Fable', developer_id: developerIds[5], genre_id: genreIds[2], platform_id: platformIds[4] },
            { title: 'Yakuza: Like a Dragon', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'A Plague Tale: Innocence', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Project Zomboid', developer_id: developerIds[2], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'Two Point Hospital', developer_id: developerIds[8], genre_id: genreIds[5], platform_id: platformIds[1] },
            { title: 'Papers, Please', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Gris', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Sonic Mania', developer_id: developerIds[6], genre_id: genreIds[7], platform_id: platformIds[3] },
            { title: 'Rogue Legacy', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Fez', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'The Witness', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Unravel', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Ni no Kuni II: Revenant Kingdom', developer_id: developerIds[7], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Braid', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Star Wars Jedi: Fallen Order', developer_id: developerIds[1], genre_id: genreIds[1], platform_id: platformIds[4] },
            { title: 'Control', developer_id: developerIds[3], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Dishonored 2', developer_id: developerIds[3], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'Hellblade: Senua\'s Sacrifice', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[1] },
            { title: 'Surgeon Simulator', developer_id: developerIds[2], genre_id: genreIds[0], platform_id: platformIds[0] },
            { title: 'EVE Online', developer_id: developerIds[8], genre_id: genreIds[0], platform_id: platformIds[1] },
            { title: 'Terraria', developer_id: developerIds[3], genre_id: genreIds[5], platform_id: platformIds[0] },
            { title: 'The Forest', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Factorio', developer_id: developerIds[3], genre_id: genreIds[5], platform_id: platformIds[0] },
            { title: 'Dead Cells', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Return to Monkey Island', developer_id: developerIds[3], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Ghostrunner', developer_id: developerIds[4], genre_id: genreIds[0], platform_id: platformIds[1] },
            { title: 'Danganronpa: Trigger Happy Havoc', developer_id: developerIds[6], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Yakuza Kiwami', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[1] },
            { title: 'Life is Strange', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'The Stanley Parable', developer_id: developerIds[4], genre_id: genreIds[1], platform_id: platformIds[0] },
            { title: 'Slay the Spire', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Hollow Knight: Silksong', developer_id: developerIds[4], genre_id: genreIds[6], platform_id: platformIds[0] },
            { title: 'Monster Hunter: Stories 2', developer_id: developerIds[4], genre_id: genreIds[2], platform_id: platformIds[3] },
            { title: 'Skate 4', developer_id: developerIds[4], genre_id: genreIds[5], platform_id: platformIds[4] }
        ];
        
        const gamePromises = games.map(game => 
            client.query(
                'INSERT INTO games (title, developer_id, genre_id, platform_id) VALUES ($1, $2, $3, $4)', 
                [game.title, game.developer_id, game.genre_id, game.platform_id]
            )
        );
        await Promise.all(gamePromises);

        console.log('Database populated successfully!');
    } catch (err) {
        console.error('Error populating the database:', err);
    } finally {
        await client.end();
    }
}

populateDatabase();

