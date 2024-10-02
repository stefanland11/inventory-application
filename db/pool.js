const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "stefanland",
  database: "game_inventory",
  password: "pass",
  port: 5432 // The default port
});