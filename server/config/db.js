const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Database Connected');
})

module.exports = db;