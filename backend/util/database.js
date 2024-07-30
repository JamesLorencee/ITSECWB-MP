require("dotenv").config();
const mysql = require("mysql2/promise");

// Create a function to get a new database connection
async function getConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            database: "itsecwb-mp",
        });
        return connection;
    } catch (error) {
        throw error;
    }
}

// Function to close the connection
async function closeConnection(connection) {
    try {
        await connection.end();
    } catch (error) {
        console.error("Error closing the connection:", error);
    }
}

module.exports = {
    getConnection,
    closeConnection,
};
