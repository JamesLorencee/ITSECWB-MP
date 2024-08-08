const db = require("../util/database");
const bcrypt = require("bcryptjs");


module.exports = class Expense {
    constructor(uid, expenseDate, expenseItem, expenseAmt, expenseSrc, expenseID = null) {
        this.uid = uid;
        this.expenseDate = expenseDate;
        this.expenseItem = expenseItem;
        this.expenseAmt = expenseAmt;
        this.expenseSrc = expenseSrc;
        if (expenseID !== null) {
            this.expenseID = expenseID;
        }
    }

    static async get(uid) {
        return new Promise((resolve, reject) => {
            db.execute(
                `SELECT e.*, c.categoryName AS categoryExpense, DATE_FORMAT(e.expenseDate, '%m/%d/%y') AS formatDate 
        FROM expenselogs e
        JOIN categorylist c ON e.expenseSource = c.categoryID
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

    static async add(expense) {
        return new Promise((resolve, reject) => {
            db.execute(
                `INSERT INTO expenselogs (userID, expenseDate, expenseItem, expenseAmt, expenseSource) 
         VALUES (?, CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00'), ?, ?, ?)`,
                [expense.uid, expense.expenseDate, expense.expenseItem, expense.expenseAmt, expense.expenseSrc],
                (err) => {
                    if (err) reject(err);
                    else resolve(null);
                }
            );
        });
    }

    static async edit(expenseID) {
        return new Promise((resolve, reject) => {
            db.execute(
                `SELECT * FROM expenselogs
        WHERE expenseID = ?;`,
                [expenseID],
                (err, rows) => {
                    if (err) reject(err);
                    else {
                        resolve(rows[0]);
                    }
                }
            );
        });
    }

    static async save(expense) {
        return new Promise((resolve, reject) => {
            db.execute(
                `UPDATE expenselogs 
        SET 
            expenseDate = CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00') ,
            expenseItem = ?,  
            expenseAmt = ?, 
            expenseSource = ?
        WHERE expenseID = ?
        AND userID = ?;`,
                [
                    expense.expenseDate,
                    expense.expenseItem,
                    expense.expenseAmt,
                    expense.expenseSrc,
                    expense.expenseID,
                    expense.uid,
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

    static async delete(expenseID) {
        return new Promise((resolve, reject) => {
            db.execute(
                `DELETE FROM expenselogs
        WHERE expenseID = ?;`,
                [expenseID],
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
                "SELECT categoryID, categoryName FROM categorylist WHERE categorytype = 'expense'",
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
