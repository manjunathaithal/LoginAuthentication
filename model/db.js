const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/growIndigo";
const mongodb = async () => {
  try {
    const con = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("DataBase Is Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongodb;
