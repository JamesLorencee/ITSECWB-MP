const Income = require("../models/income");
const { logger } = require("../util/logger");

exports.get = async (req, res) => {
  const uid = req.user.userId;

  try {
    const [incomeList, categoryList] = await Promise.all([
      Income.get(uid),
      Income.getCategories(),
    ]);
    res
      .status(200)
      .json({ ok: true, incomeList: incomeList, categoryList: categoryList });
  } catch (err) {
    let json = { ok: false, error: "Income Error" };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };

    res.status(500).json(json);
  }
};

exports.add = async (req, res) => {
  const uid = req.user.userId;
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
    res.status(200).json({ ok: true, res: add });
    logger.info(
      `User ${uid} added income: Amount: ${incomeAmt}, Source: ${incomeSrc}`
    );
  } catch (err) {
    let json = { ok: false, error: "Income Error" };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };

    res.status(500).json(json);
  }
};

exports.edit = async (req, res) => {
  const id = req.params.incomeID;

  try {
    const editIncome = await Income.edit(id);
    res.status(200).json({ ok: true, editIncome: editIncome });
  } catch (err) {
    let json = { ok: false, error: "Income Error" };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };

    res.status(500).json(json);
  }
};

exports.save = async (req, res) => {
  const uid = req.user.userId;
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
    res.status(200).json({ ok: true, res: save });
    logger.info(
      `User ${uid} edited income: Income ID: ${incomeID}, Amount: ${incomeAmt}, Source: ${incomeSrc}`
    );
  } catch (err) {
    let json = { ok: false, error: "Income Error" };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };

    res.status(500).json(json);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.incomeID;
  const uid = req.user.userId;

  try {
    const deleteIncome = await Income.delete(id);
    res.status(200).json({ ok: true, ...deleteIncome });
    logger.info(`User ${uid} deleted income: Income ID: ${id}`);
  } catch (err) {
    let json = { ok: false, error: "Income Error" };
    if (process.env.DEBUG) json = { ...json, stack: err.stack };

    res.status(500).json(json);
  }
};
