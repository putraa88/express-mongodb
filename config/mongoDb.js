require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error in MongoDB connection ' + error);
  }
})();

const db = client.db('express-mongodb-native');

module.exports = db;