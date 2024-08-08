require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const https = require("https");
const cors = require("cors");
const fs = require("fs");

const { logger } = require("./util/logger");

const authRoutes = require("./routes/auth.routes");
const incomeRoutes = require("./routes/income.route");
const expenseRoutes = require("./routes/expense.route");
const mgmtRoutes = require("./routes/mgmt.route");

const errorController = require("./controller/error.controller");

const app = express();
const ports = process.env.PORT || 3000;

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-scripts.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    })
);

app.use(
    helmet.hsts({
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    })
);
app.use(helmet());
app.use(xss());
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "https://localhost:4200",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

// https key and certificate
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

app.use("/auth", authRoutes);
app.use("/incomeLogs", incomeRoutes);
app.use("/expenseLogs", expenseRoutes);
app.use("/mgmt", mgmtRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

// Creating https server by passing
// options and app object
const server = https.createServer(options, app)

server.listen(ports, () => {
    logger.info(`HTTPS server started at port ${ports}`)
});

server.on('error', (err) => {
    logger.error("Failed to start HTTPS server", err.message)
    logger.debug(err);
})
// app.listen(ports, () => console.log(`Listening on port ${ports}`));
