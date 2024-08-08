require("dotenv");
const { getConnection, closeConnection } = require("../util/database");

exports.addExpenseValidation = async (req, res, next) => {
    const { expenseDate, expenseItem, expenseAmt, expenseSrc } = req.body;

    // Validate expenseDate
    if (!expenseDate || isNaN(new Date(expenseDate).getTime())) {
        return res.status(400).json({ ok: false, error: 'Invalid expenseDate. Must be a valid date.' });
    }

    // Validate expenseItem
    if (typeof expenseItem !== 'string' || expenseItem.length < 1 || expenseItem.length > 36) {
        return res.status(400).json({ ok: false, error: 'Invalid expenseItem. Must be a string with 1 to 36 characters.' });
    }

    // Validate expenseAmt
    const amtPattern = /^(?!0\d)\d{1,8}(\.\d{1,2})?$/;
    if (!amtPattern.test(expenseAmt) || Number(expenseAmt) < 0 || Number(expenseAmt) > 99999999.99) {
        return res.status(400).json({ ok: false, error: 'Invalid expenseAmt. Must be between 0 and 99999999.99.' });
    }

    const connection = await getConnection();
    try {
        const query = `
            SELECT * 
            FROM categorylist
            WHERE categoryID = ? 
                AND categoryType = 'expense'`;
        const params = [expenseSrc];

        const [rows, _fields] = await connection.execute(
            query,
            params
        )
        if (!rows.length)
            return res.status(400).json({ ok: false, error: "Invalid expenseSrc. Must be a non-empty string." });
    } catch (err) {
        let json = { ok: false, error: "Invalid expenseSrc. Must be a non-empty string." };
        if (process.env.DEBUG) json = { ...json, stack: err.stack };
        return res.status(400).json();
    } finally {
        closeConnection(connection);
    }
    // If all validations pass, proceed to the next middleware or route handler
    next();
};
