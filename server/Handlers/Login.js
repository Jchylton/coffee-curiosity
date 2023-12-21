"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const Login = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("coffeecuriosity");
    const allUsers = await db.collection("community").find().toArray();
    console.log(allUsers);
    console.log(req.body);
    if (allUsers.every((u) => u.Email !== req.body.Email)) {
      const addUser = await db.collection("community").insertOne(req.body);
      return res.status(201).json({ status: 201, data: "User Added" });
    } else {
      return res.status(201).json({ status: 201, data: "User Logged In" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

module.exports = { Login };
