require("dotenv").config();
const Income = require("../models/income");

exports.get = async (req, res) => {
  const uid = req.params.uid;

  try {
    const incomeList = await Income.get(uid);
    const categoryList = await Income.getCategories();
    res.json({ incomeList: incomeList, categoryList: categoryList });
  } catch (err) {
    res.status(500).json({ message: "GET Income Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.add = async (req, res) => {
  const uid = req.params.uid;
  const incomeDate = req.body.incomeDate;
  const incomeAmt = req.body.incomeAmt;
  const incomeSrc = req.body.incomeSrc;

  try {
    const income = {
      uid: uid,
      incomeDate: incomeDate,
      incomeAmt: incomeAmt,
      incomeSrc: incomeSrc,
    };

    const add = await Income.add(income);
    res.json({ res: add });
  } catch (err) {
    res.status(500).json({ message: "Add Income Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.delete = async (req, res) => {
  const id = req.params.incomeID;

  try {
    const deleteIncome = await Income.delete(id);
    res.json(deleteIncome);
  } catch (err) {
    res.status(500).json({ message: "DELETE Income Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.edit = async (req, res) => {
  const id = req.params.incomeID;

  try {
    const editIncome = await Income.edit(id);
    res.json({ editIncome: editIncome });
  } catch (err) {
    res.status(500).json({ message: "EDIT Income Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.save = async (req, res) => {
  const uid = req.body.uid;
  const incomeID = req.body.incomeID;
  const incomeDate = req.body.incomeDate;
  const incomeAmt = req.body.incomeAmt;
  const incomeSrc = req.body.incomeSrc;

  try {
    const income = {
      uid: uid,
      incomeDate: incomeDate,
      incomeAmt: incomeAmt,
      incomeSrc: incomeSrc,
      incomeID: incomeID,
    };

    const save = await Income.save(income);
    res.json({ res: save });
  } catch (err) {
    res.status(500).json({ message: "SAVE Income Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};
