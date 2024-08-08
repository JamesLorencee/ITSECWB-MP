require("dotenv").config();
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
        })
    ]
});

exports.logger = logger;

