require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");

const authRoutes = require("./routes/auth.route");
const incomeRoutes = require("./routes/income.route");
const expenseRoutes = require("./routes/expense.route");
const mgmtRoutes = require("./routes/mgmt.route");
const currencyRoutes = require("./routes/currency.route");

const db = require("./util/database");

const errorController = require("./controllers/error.controller");

const app = express();
const ports = process.env.PORT || 3000;

app.use(helmet()); // Sets HTTP response headers (Hides X-Powered-By to avoid targeted Express attacks, among others)
app.use(xss()); // Sanitizes data passed in req.body, req.params, or req.query
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/auth", authRoutes);
app.use("/incomeLogs", incomeRoutes);
app.use("/expenseLogs", expenseRoutes);
app.use("/mgmt", mgmtRoutes);
app.use("/currency", currencyRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));

module.exports = {
    port: process.env.PORT || 3000,
    connection: db,
};
