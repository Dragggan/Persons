const mongoose = require("mongoose");

require("dotenv").config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log("%c  error==> ", "color:red;font-size:12px;", error);
    process.exit(1);
  }
};

module.exports = connectDb;
