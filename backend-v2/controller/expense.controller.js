const Expense = require("../models/expense");
const { logger } = require("../util/logger");
exports.get = async (req, res) => {
    const uid = req.user.userId;

    try {
        const [expenseList, categoryList] = await Promise.all(
            [
                Expense.get(uid),
                Expense.getCategories()
            ]);
        res.status(200).json({ ok: true, expenseList: expenseList, categoryList: categoryList });
    } catch (err) {
        {
            let json = { ok: false, error: "Invalid Expense" };

            if (process.env.DEBUG) json = { ...json, stack: err.stack };
            return res.status(500).json(json);
        }
    }
};

exports.add = async (req, res) => {
    const uid = req.user.userId;
    const expenseDate = req.body.expenseDate;
    const expenseItem = req.body.expenseItem;
    const expenseAmt = req.body.expenseAmt;
    const expenseSrc = req.body.expenseSrc;

    try {
        const expense = {
            uid: uid,
            expenseDate: expenseDate,
            expenseItem: expenseItem,
            expenseAmt: expenseAmt,
            expenseSrc: expenseSrc,
        };

        const add = await Expense.add(expense);
        res.status(200).json({ ok: true, res: add });
        logger.info(`User ${uid} Successfully Added Expense Item: ${expenseItem}, Amount: ${expenseAmt}, Source: ${expenseSrc}`);
    } catch (err) {
        {  
            let json = { ok: false, error: "Add Expense Error" };
            if (process.env.DEBUG) json = { ...json, stack: err.stack };
            return res.status(500).json(json); 
        }
    }
};

exports.edit = async (req, res) => {
    const uid = req.user.userId;
    const id = req.params.expenseID;

    try {
        const editExpense = await Expense.edit(id);
        res.status(200).json({ ok: true, editExpense: editExpense });
        logger.info(`User ${uid} Successfully Edited Expense with ID of ${id}`);
    } catch (err) {
        { 
            let json = { ok: false, error: "Edit Expense Error" };
            if (process.env.DEBUG) json = { ...json, stack: err.stack };
            return res.status(500).json(json);
        }
    }
};

exports.save = async (req, res) => {
    const uid = req.user.userId;
    const expenseID = req.body.expenseID;
    const expenseItem = req.body.expenseItem;
    const expenseDate = req.body.expenseDate;
    const expenseAmt = req.body.expenseAmt;
    const expenseSrc = req.body.expenseSrc;

    try {
        const expense = {
            uid: uid,
            expenseDate: expenseDate,
            expenseItem: expenseItem,
            expenseAmt: expenseAmt,
            expenseSrc: expenseSrc,
            expenseID: expenseID,
        };

        const save = await Expense.save(expense);
        res.status(200).json({ ok: true, res: save });
        logger.info(`User ${uid} Successfully Edited Expense Item: ${expenseItem}, Amount: ${expenseAmt}, Source: ${expenseSrc}`);
    } catch (err) {
        { 
            let json = { ok: false, error: "Save Expense Error" };
            if (process.env.DEBUG) json = { ...json, stack: err.stack };
            return res.status(500).json(json);
        }
    }
};

exports.delete = async (req, res) => {
    const uid = req.user.userId;
    const id = req.params.expenseID;

    try {
        const deleteExpense = await Expense.delete(id);
        res.status(200).json({ ok: true, ...deleteExpense });
        logger.info(`User ${uid} Successfully Deleted Expense ${id}`);
    } catch (err) {
        { 
            let json = { ok: false, error: "Delete Expense Error" };
            if (process.env.DEBUG) json = { ...json, stack: err.stack };
            return res.status(500).json(json);
        }
    }
};
