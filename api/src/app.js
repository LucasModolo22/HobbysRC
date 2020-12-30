const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const nocache = require('nocache');

const app = express();

app.use(cookieParser());
app.unsubscribe(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(nocache());
app.use(helmet.ieNoOpen());
app.use(hpp());

app.options('*', cors())
app.use((req, res, next) => {
    app.use(cors({
        credentials: true,
        optionsSuccessStatus: 200
    }));

    // var origin = req.headers.origin || "*";
    // res.setHeader('Access-Control-Allow-Origin', origin || '*');
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin");
    res.header("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    res.header("X-Frame-Options", "SAMEORIGIN");
    res.header("X-XSS-Protection", 0);
    res.header("X-Content-Type-Options", "nosniff");

    if (req.headers["content-type"] === 'application/xml') return res.status(406).send()
    next();
});

const userRoute = require('./routes/userRoutes');

app.use('/', userRoute);

module.exports = app;