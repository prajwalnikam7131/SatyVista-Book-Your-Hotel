require('dotenv').config();

const mongoose = require('mongoose');

const mongo_url = process.env.MONGODB_URL;

mongoose.connect(mongo_url)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log("connection error occoured :",err));

module.exports = mongoose.connection;