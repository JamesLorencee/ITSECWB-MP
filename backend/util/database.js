require("dotenv").config();

const mysql = require("mysql2");

// DB Credentials in .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: "itsecwb-mp",
});

db.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Successfully connected to DB as ID " + db.threadId);
    }
});

module.exports = db;
