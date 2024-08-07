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

    static async save(user) {
        const connection = awaiat getConnection();
        try {
            const query = `INSERT INTO users (
                  id
                  , name
                  , email
                  , password
                  , phoneNumber
                  , photoFileName
              ) VALUES (?, ? ,?, ?, ?, ?)`,
            const params = [
                user.uuid,
                user.name,
                user.email,
                user.password,
                user.phoneNumber,
                user.photoFileName,
            ];

            const [rows, fields] = await connection.execute(
                query,
                params
            )
            return (user.uuid);
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection)
        }
    }
}
