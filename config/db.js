const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://admin:test123@ac-mlmq6bl-shard-00-00.cx4net7.mongodb.net:27017,ac-mlmq6bl-shard-00-01.cx4net7.mongodb.net:27017,ac-mlmq6bl-shard-00-02.cx4net7.mongodb.net:27017/?ssl=true&replicaSet=atlas-o8935z-shard-0&authSource=admin&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB ERROR:", err.message);
  }
};

module.exports = connectDB;