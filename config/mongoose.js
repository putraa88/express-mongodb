require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', () => console.log('mongoose connected'));