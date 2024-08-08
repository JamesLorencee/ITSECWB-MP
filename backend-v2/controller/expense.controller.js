const Expense = require("../models/expense");

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
        // res.status(500).json({ message: "GET Expense Error", err: err });
        res.status(500).json({ ok: false, error: "GET Expense Error" });
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
    } catch (err) {
        res.status(500).json({ ok: false, error: "Add Expense Error" });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.expenseID;

    try {
        const editExpense = await Expense.edit(id);
        res.status(200).json({ ok: true, editExpense: editExpense });
    } catch (err) {
        res.status(500).json({ error: "EDIT Expense Error", ok: false });
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
    } catch (err) {
        res.status(500).json({ error: "SAVE Expense Error", ok: false });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.expenseID;

    try {
        const deleteExpense = await Expense.delete(id);
        res.status(200).json({ ok: true, ...deleteExpense });
    } catch (err) {
        res.status(500).json({ error: "DELETE Expense Error", ok: false });
    }
};
