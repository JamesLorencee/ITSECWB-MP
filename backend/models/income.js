const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Income {
  constructor(uid, incomeDate, incomeAmt, incomeSrc, incomeID = null) {
    this.uid = uid;
    this.incomeDate = incomeDate;
    this.incomeAmt = incomeAmt;
    this.incomeSrc = incomeSrc;
    if (incomeID !== null) {
      this.incomeID = incomeID;
    }
  }

  static async get(uid) {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT i.*, c.categoryName AS categoryIncome, DATE_FORMAT(i.incomeDate, '%m/%d/%y') AS formatDate 
        FROM incomelogs i 
        JOIN categorylist c ON i.incomeSource = c.categoryID
        WHERE userID = ?`,
        [uid],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async add(income) {
    return new Promise((resolve, reject) => {
      db.execute(
        `INSERT INTO incomelogs (userID, incomeDate, incomeAmt, incomeSource) VALUES (?, CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00') ,?, ?)`,
        [income.uid, income.incomeDate, income.incomeAmt, income.incomeSrc],
        (err) => {
          if (err) reject(err);
          else resolve(null);
        }
      );
    });
  }

  static async delete(incomeID) {
    return new Promise((resolve, reject) => {
      db.execute(
        `DELETE FROM incomelogs
        WHERE incomeID = ?;`,
        [incomeID],
        (err) => {
          if (err) reject(err);
          else {
            resolve(null);
          }
        }
      );
    });
  }

  static async edit(incomeID) {
    return new Promise((resolve, reject) => {
      db.execute(
        `SELECT * FROM incomelogs
        WHERE incomeID = ?;`,
        [incomeID],
        (err, rows) => {
          if (err) reject(err);
          else {
            resolve(rows[0]);
          }
        }
      );
    });
  }

  static async save(income) {
    return new Promise((resolve, reject) => {
      db.execute(
        `UPDATE incomelogs 
        SET 
            incomeDate = CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00') , 
            incomeAmt = ?, 
            incomeSource = ?
        WHERE incomeID = ?
        AND userID = ?;`,
        [
          income.incomeDate,
          income.incomeAmt,
          income.incomeSrc,
          income.incomeID,
          income.uid,
        ],
        (err) => {
          if (err) reject(err);
          else {
            resolve(null);
          }
        }
      );
    });
  }

  static async getCategories() {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT categoryID, categoryName FROM categorylist WHERE categorytype = 'income'",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
};
