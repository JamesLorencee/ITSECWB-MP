require("dotenv").config();
const db = require("../util/database");
const bcrypt = require("bcryptjs");
const { validateRefreshToken } = require("./jwt.model");

module.exports = class User {
  constructor(name, email, password, phoneNumber, photoFileName) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.photoFileName = photoFileName;
  }

  static getRefreshToken(userId) {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT `refreshToken` FROM `users` WHERE `id` = ?",
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.length > 0) {
              if (rows[0].refreshToken == "" || rows[0].refreshToken == null)
                reject(null);
              resolve(rows[0].refreshToken);
            } else {
              reject(null);
            }
          }
        }
      );
    });
  }

  static async deleteRefreshToken(userId) {
    return new Promise((resolve, reject) => {
      db.execute(
        "UPDATE `users` SET refreshToken = null WHERE id = ?",
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.length > 0) {
              resolve(rows[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  static async updateRefreshToken(refreshToken, userId) {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(refreshToken, salt);
    return new Promise((resolve, reject) => {
      db.execute(
        "UPDATE `users` SET refreshToken = ? WHERE id = ?",
        [hashed, userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.length > 0) {
              resolve(rows[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  static find(email) {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.length > 0) {
              resolve(rows[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  static async getUUID() {
    return new Promise((resolve, reject) => {
      db.execute(`SELECT UUID() AS uuid`, [], (err, rows) => {
        if (err) reject(err);

        resolve(rows[0].uuid);
      });
    });
  }

  static async save(user) {
    return new Promise((resolve, reject) => {
      db.execute(
        `INSERT INTO users (id, name, email, password, phoneNumber, photoFileName) VALUES (?, ? ,?, ?, ?, ?)`,
        [
          user.uuid,
          user.name,
          user.email,
          user.password,
          user.phoneNumber,
          user.photoFileName,
        ],
        (err) => {
          if (err) reject(err);

          resolve(user.uuid);
        }
      );
    });
  }

  static saveImg(photoFileName, email) {
    return db.execute("UPDATE users SET photoFileName = ? WHERE (email = ?);", [
      photoFileName,
      email,
    ]);
  }

  static async getUsers(uid) {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT * FROM users
                WHERE id NOT LIKE ?;`,
        [uid],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static async getLogs() {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT a.*, u.isAdmin, u.email, DATE_FORMAT(a.timestamp,'%M %d, %Y %l:%i:%s') AS formatDate FROM audit_logs a
        JOIN users u ON a.userID = u.id`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
};
