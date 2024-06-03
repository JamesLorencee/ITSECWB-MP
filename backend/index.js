const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(ports, () => console.log (`Listening on port ${ports}`));
