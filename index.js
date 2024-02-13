require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const DB = process.env.DB;
const users = require("./userSchema");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

app.get("/users", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/users/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    mobile,
    password,
    dateOfBirth,
    course,
    gender,
  } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) return res.status(404).json("Email already exist");

    const user = new users({
      firstName,
      lastName,
      email,
      address,
      mobile,
      password,
      dateOfBirth,
      course,
      gender,
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
