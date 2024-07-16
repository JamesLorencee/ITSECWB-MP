const db = require("../util/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.validateRefreshToken = (refreshToken) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return false;
        return true;
    });
}

exports.checkIfBlacklisted = (token) => {
    return new Promise((resolve, reject) => {
        db.execute(
            "SELECT * FROM `jwt_blacklist` WHERE `jwt_token` = ? AND expiration_time > NOW()",
            [token],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        reject(rows[0]);
                    } else {
                        resolve(null);
                    }
                }
            }
        );
    });
};

exports.blackListJWT = (token, time) => {
    return this.checkIfBlacklisted(token)
        .then(() => {
            return new Promise((resolve, reject) => {
                db.execute(
                    "INSERT INTO `jwt_blacklist` VALUES (?, FROM_UNIXTIME(?))",
                    [token, time],
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
        })
        .catch(() => {
            return true;
        });
};
