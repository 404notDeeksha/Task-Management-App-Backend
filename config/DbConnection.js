const mongoose = require("mongoose");

const dbConnection = async () => {
  const connect = await mongoose
    .connect(process.env.TASK_MANAGEMENT_CONNECTION_STRING)
    .then(() => {
      console.log("Mongodb Db connection success");
    })
    .catch((err) => {
      console.log("Mongodb Db connection failed", err);
    });
};

module.exports = dbConnection;
