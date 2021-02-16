const express = require("express");
const dbConnection = require("./model/db");
const User = require("./model/dbSchema");
const lowercase = require("lower-case");

const app = express();
app.use(express.json());
dbConnection();

app.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const emailValidation = await User.findOne({ email: email });
    if (!emailValidation) {
      return res.status(400).send("Email does not exist! please signUp");
    }

    if (emailValidation.name.toLowerCase() !== name.toLowerCase()) {
      return res.status(400).send("Invalid Name!!");
    }

    res.send("User Logged In!!!");
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email } = req.body;
    const emailValidation = await User.findOne({ email: email });
    if (emailValidation) {
      return res.send("Email Already Exist!!");
    }
    const user = new User({
      name: name,
      email: email,
    });
    const result = await user.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8081, console.log("Server is Running"));
