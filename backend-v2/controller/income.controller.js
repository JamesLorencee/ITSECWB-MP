const Income = require("../models/income");

exports.get = async (req, res) => {
    const uid = req.user.userId;

    try {
        const [incomeList, categoryList] = await Promise.all(
            [
                Income.get(uid),
                Income.getCategories()
            ]);
        res.status(200).json({ ok: true, incomeList: incomeList, categoryList: categoryList });
    } catch (err) {
        res.status(500).json({ ok: false, error: "GET Income Error" });
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
    } catch (err) {
        res.status(500).json({ ok: false, error: "Add Income Error" });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.incomeID;

    try {
        const editIncome = await Income.edit(id);
        res.status(200).json({ ok: true, editIncome: editIncome });
    } catch (err) {
        res.status(500).json({ ok: false, error: "EDIT Income Error" });
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
    } catch (err) {
        res.status(500).json({ ok: false, error: "SAVE Income Error" });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.incomeID;

    try {
        const deleteIncome = await Income.delete(id);
        res.status(200).json({ ok: true, ...deleteIncome });
    } catch (err) {
        res.status(500).json({ ok: false, error: "DELETE Income Error" });
    }
};

