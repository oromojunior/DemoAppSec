/* const { MongoClient } = require('mongodb');
const database = module.exports;
database.connect = async function connect() {
  database.client = await MongoClient.connect('mongodb://root:1234@database/', { useUnifiedTopology: true });
};
 */

const mongoose = require('mongoose');

const dburl = 'mongodb://localhost:27017/todo'

await mongoose.connect(dburl, { useUnifiedTopology: true });