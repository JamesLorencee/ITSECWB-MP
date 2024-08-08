const { getConnection, closeConnection } = require("../util/database");

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

    static async get(userId) {
        const connection = await getConnection()
        try {
            const query = `
                SELECT 
                    e.* 
                    , c.categoryName AS categoryExpense
                    , DATE_FORMAT(e.expenseDate, '%m/%d/%y') AS formatDate 
                FROM expenselogs e
                JOIN categorylist c ON e.expenseSource = c.categoryID
                WHERE userID = ?`;
            const params = [userId];

            const [rows, _fields] = await connection.execute(
                query,
                params
            )
            return rows;
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }

    static async add(expense) {
        const connection = await getConnection()
        try {
            const query = `
                INSERT INTO expenselogs (
                    userID
                    , expenseDate
                    , expenseItem
                    , expenseAmt
                    , expenseSource
                ) VALUES (
                    ?
                    , CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00')
                    , ?
                    , ?
                    , ?
                )
            `;
            const params = [expense.uid, expense.expenseDate, expense.expenseItem, expense.expenseAmt, expense.expenseSrc];

            await connection.execute(
                query,
                params
            )
            return;
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }

    static async edit(expenseID) {
        const connection = await getConnection()
        try {
            const query = `
                SELECT * 
                FROM expenselogs
                WHERE expenseID = ?`;
            const params = [expenseID];

            const [rows, _fields] = await connection.execute(
                query,
                params
            )
            return rows[0];
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }

    static async save(expense) {
        const connection = await getConnection()
        try {
            const query = `
                UPDATE expenselogs SET 
                    expenseDate = CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00') ,
                    expenseItem = ?,  
                    expenseAmt = ?, 
                    expenseSource = ?
                WHERE expenseID = ?
                AND userID = ?
                `;
            const params = [
                expense.expenseDate,
                expense.expenseItem,
                expense.expenseAmt,
                expense.expenseSrc,
                expense.expenseID,
                expense.uid,
            ];

            await connection.execute(
                query,
                params
            )
            return;
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }

    static async delete(expenseID) {
        const connection = await getConnection()
        try {
            const query = `
                    DELETE FROM expenselogs
                    WHERE expenseID = ?
                `;
            const params = [expenseID];

            await connection.execute(
                query,
                params
            )
            return;
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }

    static async getCategories() {
        const connection = await getConnection()
        try {
            const query = `
                    SELECT 
                        categoryID
                        , categoryName 
                    FROM categorylist 
                    WHERE categorytype = 'expense'
                `;

            const [rows, _fields] = await connection.execute(
                query,
                []
            )
            return rows;
        } catch (error) {
            throw error;
        } finally {
            closeConnection(connection);
        }
    }
};

