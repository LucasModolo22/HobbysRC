require('dotenv').config()
const express = require('express');
const app = require('../src/app');
const db = require('../src/models');
const fs = require('fs');
const https = require('https');
 
db.sequelize.sync().then(() => {
    console.log("[DB] - Connected")
}).catch(error => {
    console.log(`[DB] - Error!\n${error}`)
})

var options = {
    key: fs.readFileSync(__dirname + '/../bin/server.key'),
    cert: fs.readFileSync(__dirname + '/../bin/server.cert')
};

https.createServer(options, app).listen(process.env.PORT, function () {
    console.log("[HTTPS] - Listening on port " + process.env.PORT);
});

app.set('port', process.env.PORT);