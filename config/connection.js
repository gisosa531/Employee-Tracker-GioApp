// Import and require mysql2
const mysql = require("mysql2");

// Enable access to .env variables
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: process.env.DB_PASSWORD,
  database: "employees_db"
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
