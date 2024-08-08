require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const https = require("https");
const cors = require("cors");
const fs = require("fs");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const app = express();
const ports = process.env.PORT || 3000;

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-scripts.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
}));

app.use(helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
}));
app.use(helmet());
app.use(xss());
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "https://localhost:4200",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}

app.use(cors(corsOptions));

// https key and certificate
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
}
app.use("/auth", authRoutes);

// Creating https server by passing
// options and app object
https.createServer(options, app).listen(ports, (err) => {
    if (err) {
        console.error("Failed to start HTTPS server:", err);
    } else {
        console.log(`HTTPS server started at port ${ports}`);
    }
});

// app.listen(ports, () => console.log(`Listening on port ${ports}`));
