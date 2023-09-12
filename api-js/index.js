const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const app = express();
const port = 1337;

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use(express.json());

const home = require('./api/routes/home');
const employees = require('./api/routes/employees');

app.use('/api/v1/', home);
app.use('/api/v1/employees', employees);

let dsn;

if (process.env.NODE_ENV === 'test') {
    dsn = process.env.DSN_TEST || "mongodb://127.0.0.1:27017/test";
} else {
    dsn = process.env.DSN || "mongodb://127.0.0.1:27017/employees";
}

mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(() => {
        app.listen(port, () => {
            console.info(`Personnel API listening on port ${port}!`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "message":  err.message
            }
        ]
    });
});

exports.server = app;
