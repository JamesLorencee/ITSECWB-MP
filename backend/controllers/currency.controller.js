const CC = require("currency-converter-lt");
const currencyConverter = new CC();

exports.getCurrencies = async (req, res) => {
    res.status(200).json(currencyConverter.currencies)
}

exports.convert = async (req, res) => {
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount

    currencyConverter.from(from).to(to).amount(amount).convert().then((value) => {
        res.status(200).json(value)
    }).catch((err) => {
        res.status(503).json({ error: err });
    })
}

exports.test = async (req, res) => {
    const result = await fetch("https://v6.exchangerate-api.com/v6/3c138da5d5d7967aa7bd296d/latest/ASX")
    const value = await result.json();
    res.status(result.status).json(value);
}
