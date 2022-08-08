const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://junhoang:Sydney2022@cluster0.succpje.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected!");
  } catch (err) {
    console.log("DB connection failed!");
  }
};

module.exports = connectDB;
