const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "8.219.166.16",
    user: process.env.DB_USER || "codetest",
    password: process.env.DB_PASSWORD || "*vNzUwdhkmj7B8@L",
    database: process.env.DB_NAME || "codetest",
    port: process.env.DB_PORT || 3309,
    
  },
});

module.exports = knex;