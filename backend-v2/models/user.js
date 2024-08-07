require("dotenv").config();
const { getConnection, closeConnection } = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class User {
    constructor(name, email, password, phoneNumber, photoFileName) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.photoFileName = photoFileName;
    }

    /** 
        * Retrieves the refresh token from the database
        *
        * @param userId - the user id of the user
        * @returns refresh token
        */
    static async getRefreshToken(userId) {
        const connection = await getConnection()
        try {
            const query = `
                SELECT refreshToken
                FROM users
                WHERE id = ?`
            const params = [userId];

            const [rows, fields] = await connection.execute(
                query,
                params
            )
            if (rows.length <= 0)
                throw new Error(`No refresh token found for user ID ${userId}`);
            return rows[0].refreshToken;
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }
}
