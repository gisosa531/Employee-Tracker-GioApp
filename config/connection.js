// Import and require mysql2
const mysql = require("mysql2");

// Enable access to .env variables
require('dotenv').config();

// Connect to database
const dbconnect = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: process.env.DB_PASSWORD,
  database: "employees_db"
});

dbconnect.connect(function (err) {
  if (err) throw err;
});

module.exports = dbconnect;
