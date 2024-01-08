const mongoose =  require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

async function connection() {

  const mongoServer = await MongoMemoryServer.create();
  console.log("MongoDB Url", mongoServer.getUri());
  const isConnected = await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
 
};

module.exports = { connection };