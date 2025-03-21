const mongoose = require("mongoose");

const dbConnection = async () => {
  const connect = await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Mongodb Db connection success");
    })
    .catch((err) => {
      console.log("Mongodb Db connection failed", err);
    });
};

module.exports = dbConnection;
