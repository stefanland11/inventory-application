const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function getAllGamesByDeveloper(developer) {
  const { rows } = await pool.query(
    "SELECT g.title FROM games g JOIN developers d ON g.developer_id = d.id WHERE d.name ILIKE '%' || ($1) || '%'",
    [developer]
  );

  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

async function getAllGamesByGenre(genre) {
  const { rows } = await pool.query(
    "SELECT g.title FROM games g JOIN genre d ON g.genre_id = d.id WHERE d.name ILIKE '%' || ($1) || '%'",
    [genre]
  );

  return rows;
}

async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platform");
  return rows;
}

async function getAllGamesByPlatform(platform) {
  const { rows } = await pool.query(
    "SELECT g.title FROM games g JOIN platform d ON g.platform_id = d.id WHERE d.name ILIKE '%' || ($1) || '%'",
    [platform]
  );

  return rows;
}

async function getSearchDB(table, search) {
  let response;
  console.log(table);

  if (table === "games") {
    response = await pool.query(
      "SELECT g.title FROM games g WHERE title ILIKE '%' || ($1) || '%' ",
      [search]
    );
  } else {
    response = await pool.query(
      `SELECT name FROM ${table} WHERE name ILIKE '%' || ($1) || '%'`,
      [search]
    );
  }
  return response.rows;
}

module.exports = {
  getAllGames,
  getAllDevelopers,
  getAllGamesByDeveloper,
  getAllGenres,
  getAllGamesByGenre,
  getAllPlatforms,
  getAllGamesByPlatform,
  getSearchDB,
};
