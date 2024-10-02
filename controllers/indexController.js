const db = require("../db/queries");

const links = [
  { href: "/", text: "Games" },
  { href: "/genres", text: "Genres" },
  { href: "/platforms", text: "Platforms" },
  { href: "/developers", text: "Developers" },
];

async function getGames(req, res) {
  const games = await db.getAllGames();
  console.log("Games: ", games);
  res.render("index", { games: games, links: links });
}

async function getDevelopers(req, res) {
  const developers = await db.getAllDevelopers();
  console.log("Developers: ", developers);
  const devLinks = developers.map((dev) => {
    const encoded = encodeURIComponent(dev.name);
    return { href: `/developers/${encoded}`, text: dev.name };
  });
  res.render("developers", { devLinks: devLinks, links: links });
}

async function getGamesByDeveloper(req, res) {
  const { developer } = req.params;
  console.log(developer);
  const games = await db.getAllGamesByDeveloper(developer);
  res.render("gamesByDeveloper", {
    games: games,
    developer: developer,
    links: links,
  });
}

async function getGenres(req, res) {
  const genres = await db.getAllGenres();
  console.log("Genres: ", genres);
  const genreLinks = genres.map((genre) => {
    const encoded = encodeURIComponent(genre.name);
    return { href: `/genres/${encoded}`, text: genre.name };
  });
  res.render("genres", { genreLinks: genreLinks, links: links });
}

async function getGamesByGenre(req, res) {
  const { genre } = req.params;
  console.log(genre);
  const games = await db.getAllGamesByGenre(genre);
  res.render("gamesByGenre", { games: games, genre: genre, links: links });
}

async function getPlatforms(req, res) {
  const platforms = await db.getAllPlatforms();
  console.log("Platforms: ", platforms);
  const platLinks = platforms.map((plat) => {
    const encoded = encodeURIComponent(plat.name);
    return { href: `/platforms/${encoded}`, text: plat.name };
  });
  res.render("platforms", { platLinks: platLinks, links: links });
}

async function getGamesByPlatform(req, res) {
  const { platform } = req.params;
  console.log(platform);
  const games = await db.getAllGamesByPlatform(platform);
  res.render("gamesByPlatform", {
    games: games,
    platform: platform,
    links: links,
  });
}

async function getSearch(req, res) {
  let { filter, search } = req.query;
  let name = "name";

  switch (filter) {
    case "":
      filter = "games";
      name = "title";
      break;
    case "Game":
      filter = "games";
      name = "title";
      break;
    case "Platform":
      filter = "platform";
      break;
    case "Genre":
      filter = "genre";
      break;
    case "Developer":
      filter = "developers";
      break;
    default:
      // If filter doesn't match any of the expected cases, return an error
      return res
        .status(400)
        .json({
          error:
            "Invalid filter. Accepted filters are: Game, Platform, Genre, Developer.",
        });
  }
  const results = await db.getSearchDB(filter, search);
  res.render("search", {
    filter: capitalize(filter),
    results: results,
    links: links,
    name: name,
  });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = {
  getGames,
  getDevelopers,
  getGamesByDeveloper,
  getGenres,
  getGamesByGenre,
  getPlatforms,
  getGamesByPlatform,
  getSearch,
};
