const { getConnection, closeConnection } = require("../util/database");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

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
    const connection = await getConnection();
    try {
      const query = `
                SELECT refreshToken
                FROM users
                WHERE id = ?`;
      const params = [userId];

      const [rows, fields] = await connection.execute(query, params);
      if (rows.length <= 0)
        throw new Error(`No refresh token found for user ID ${userId}`);
      return rows[0].refreshToken;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Updates the refresh token in the database
   *
   * @param refreshToken - the refresh token from the client
   * @param user - the user id of the user
   */
  static async storeRefreshToken(refreshToken, user) {
    const connection = await getConnection();
    try {
      const query = `
                    UPDATE users
                    SET refreshToken = ?
                    WHERE id = ?
                `;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashed = await bcrypt.hash(refreshToken, salt);
      const params = [hashed, user];

      await connection.execute(query, params);
      return;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Create a new user
   *
   * @param user - the user informations
   * @returns the user id
   */
  static async save(user) {
    const connection = await getConnection();
    try {
      const query = `INSERT INTO users (
                  id
                  , name
                  , email
                  , password
                  , phoneNumber
                  , photoFileName
              ) VALUES (?, ? ,?, ?, ?, ?)`;

      const params = [
        user.uuid,
        user.name,
        user.email,
        user.password,
        user.phoneNumber,
        user.photoFileName,
      ];

      const [_rows, _fields] = await connection.execute(query, params);
      return user.uuid;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Find user by email
   *
   * @param email - the user email
   * @returns the user information
   */
  static async find(email) {
    const connection = await getConnection();
    try {
      const query = `
                SELECT * 
                FROM users 
                WHERE email = ?`;
      const params = [email];

      const [rows, _fields] = await connection.execute(query, params);

      if (rows.length <= 0) return null;
      return rows[0];
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Find user by id
   *
   * @param id - the user id
   * @returns the user information
   */
  static async findByID(id) {
    const connection = await getConnection();
    try {
      const query = `SELECT id, name, email, isAdmin, isActive, photoFileName FROM users WHERE id LIKE ?`;
      const params = [id];

      const [rows, _fields] = await connection.execute(query, params);

      if (rows.length <= 0) return null;
      return rows[0];
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Updates the last login
   *
   * @param uid - the user id
   */
  static async setLastLogin(uid) {
    const connection = await getConnection();
    try {
      const query = `
                UPDATE users 
                SET lastLogin = NOW()
                WHERE id = ?`;
      const params = [uid];

      const [_rows, _fields] = await connection.execute(query, params);

      return;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Gets a new id from the database
   *
   * @returns the UUID from the database
   */
  static async getUUID() {
    const connection = await getConnection();
    try {
      const query = `SELECT UUID() AS uuid`;
      const [rows, _fields] = await connection.execute(query, []);
      return rows[0].uuid;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  static async getUsers(uid) {
    const connection = await getConnection();
    try {
      const query = `
                SELECT 
                    id
                    , name
                    , email
                    , isAdmin
                    , isActive
                    , lastLogin
                FROM users
                WHERE id NOT LIKE ?
                ORDER BY lastLogin DESC
            `;

      const params = [uid];
      const [rows, _fields] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  static async getUsersByRole(uid, role) {
    const connection = await getConnection();
    try {
      const query = `
                SELECT 
                    id
                    , name
                    , email
                    , isAdmin
                    , isActive
                    , lastLogin
                FROM users
                WHERE 
                    id NOT LIKE ?
                    AND isAdmin = ?
                ORDER BY lastLogin DESC
            `;

      const params = [uid, role];
      const [rows, _fields] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Return audit logs
   *
   * @returns audit logs
   */
  static async getLogs() {
    const connection = await getConnection();
    try {
      const query = `
                SELECT 
                    a.*
                    , u.isAdmin
                    , u.email
                    , DATE_FORMAT(a.timestamp,'%M %d, %Y %l:%i:%s') AS formatDate 
                FROM audit_logs a
                JOIN users u 
                ON a.userID = u.id
            `;

      const params = [];
      const [rows, _fields] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Toggle role of user
   *
   * @params uid - the id of the user
   */
  static async setRole(uid) {
    const connection = await getConnection();
    try {
      const query = `
                UPDATE users 
                SET isAdmin = 1 - isAdmin
                WHERE (id = ?)
            `;

      const params = [uid];
      await connection.execute(query, params);
      return;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }

  /**
   * Toggle isActive of user
   *
   * @params uid - the id of the user
   */
  static async setActive(uid) {
    const connection = await getConnection();
    try {
      const query = `
                UPDATE users 
                SET isActive = 1 - isActive
                WHERE (id = ?)
            `;

      const params = [uid];
      await connection.execute(query, params);
      return;
    } catch (error) {
      throw error;
    } finally {
      closeConnection(connection);
    }
  }
};
