require("dotenv").config();
const Expense = require("../models/expense");

exports.get = async (req, res) => {
  const uid = req.user.userId;

  try {
    const expenseList = await Expense.get(uid);
    const categoryList = await Expense.getCategories();
    res.json({ expenseList: expenseList, categoryList: categoryList });
  } catch (err) {
    res.status(500).json({ message: "GET Expense Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
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
    res.json({ res: add });
  } catch (err) {
    res.status(500).json({ message: "Add Expense Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.edit = async (req, res) => {
  const id = req.params.expenseID;

  try {
    const editExpense = await Expense.edit(id);
    res.json({ editExpense: editExpense });
  } catch (err) {
    res.status(500).json({ message: "EDIT Expense Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
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
    res.json({ res: save });
  } catch (err) {
    res.status(500).json({ message: "SAVE Expense Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.delete = async (req, res) => {
  const id = req.params.expenseID;

  try {
    const deleteExpense = await Expense.delete(id);
    res.json(deleteExpense);
  } catch (err) {
    res.status(500).json({ message: "DELETE Expense Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};
