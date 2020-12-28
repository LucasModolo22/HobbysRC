'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const db = require('../models')
 
db.sequelize.sync()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
const port = process.env.PORT || 3000
 
app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`)
})
	
module.exports = app