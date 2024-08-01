// const db = require("../util/database");
const { getConnection, closeConnection } = require("../util/database");
const jwt = require("jsonwebtoken");
const HttpError = require("../util/error");
require("dotenv").config();

exports.validateRefreshToken = (refreshToken) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) throw new HttpError(400, "Invalid Token", "Token Invalid");
        return true;
    });
}

exports.checkIfBlacklisted = (token) => {
    const connection = getConnection();
    try {
        connection.execute(
            "SELECT * FROM `jwt_blacklist` WHERE `jwt_token` = ? AND expiration_time > NOW()",
            [token],
            (err, rows) => {
                if (err) throw new HttpError(500, "Internal Server Error", err);
                if (rows.length > 0) throw new HttpError(401, "Unauthorized", "Blacklisted Token")
                return null;
            }
        )
    } catch (error) {
        throw error
    } finally {
        closeConnection(connection)
    }
    //  return new Promise((resolve, reject) => {
    //      db.execute(
    //          "SELECT * FROM `jwt_blacklist` WHERE `jwt_token` = ? AND expiration_time > NOW()",
    //          [token],
    //          (err, rows) => {
    //              if (err) {
    //                  reject(err);
    //              } else {
    //                  if (rows.length > 0) {
    //                      reject(rows[0]);
    //                  } else {
    //                      resolve(null);
    //                  }
    //              }
    //          }
    //      );
    //  });
};

exports.blackListJWT = (token, time) => {
    const connection = getConnection();
    try {
        connection.execute(
            "INSERT INTO `jwt_blacklist` VALUES (?, FROM_UNIXTIME(?))",
            [token, time],
            (err) => {
                if (err) throw new HttpError(500, "Internal Server Error", err);
                else return null;
            }
        )
    } catch (error) {
        throw error
    } finally {
        closeConnection(connection)
    }
    //  return this.checkIfBlacklisted(token)
    //      .then(() => {
    //          return new Promise((resolve, reject) => {
    //              db.execute(
    //                  "INSERT INTO `jwt_blacklist` VALUES (?, FROM_UNIXTIME(?))",
    //                  [token, time],
    //                  (err, rows) => {
    //                      if (err) {
    //                          reject(err);
    //                      } else {
    //                          if (rows.length > 0) {
    //                              resolve(rows[0]);
    //                          } else {
    //                              resolve(null);
    //                          }
    //                      }
    //                  }
    //              );
    //          });
    //      })
    //      .catch(() => {
    //          return true;
    //      });
};
