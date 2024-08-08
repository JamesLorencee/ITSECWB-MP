const { getConnection, closeConnection } = require("../util/database");

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

    static async get(userId) {
        const connection = await getConnection()
        try {
            const query = `
                SELECT 
                    i.*
                    , c.categoryName AS categoryIncome
                    , DATE_FORMAT(i.incomeDate, '%m/%d/%y') AS formatDate 
                FROM incomelogs i 
                JOIN categorylist c ON i.incomeSource = c.categoryID
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

    static async add(income) {
        const connection = await getConnection()
        try {
            const query = `
                INSERT INTO incomelogs (
                    userID
                    , incomeDate
                    , incomeAmt
                    , incomeSource
                ) VALUES (
                    ?
                    , CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00') 
                    , ?
                    , ?
                )
            `;
            const params = [income.uid, income.incomeDate, income.incomeAmt, income.incomeSrc];

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

    static async delete(incomeID) {
        const connection = await getConnection()
        try {
            const query = `
                    DELETE FROM incomelogs
                    WHERE incomeID = ?
                `;
            const params = [incomeID];

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

    static async edit(incomeID) {
        const connection = await getConnection()
        try {
            const query = `
                SELECT * 
                FROM incomelogs
                WHERE incomeId = ?`;
            const params = [incomeID];

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

    static async save(income) {
        const connection = await getConnection()
        try {
            const query = `
                UPDATE incomelogs 
                SET 
                    incomeDate = CONVERT_TZ(STR_TO_DATE(REPLACE(?, 'Z', ''), '%Y-%m-%dT%H:%i:%s.%f'), '+00:00', '+08:00') , 
                    incomeAmt = ?, 
                    incomeSource = ?
                WHERE incomeID = ?
                AND userID = ?
                `;
            const params = [
                income.incomeDate,
                income.incomeAmt,
                income.incomeSrc,
                income.incomeID,
                income.uid,
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

    static async getCategories() {
        const connection = await getConnection()
        try {
            const query = `
                    SELECT 
                        categoryID
                        , categoryName 
                    FROM categorylist 
                    WHERE categorytype = 'income'
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
