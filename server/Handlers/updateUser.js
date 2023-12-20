"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const updateUser = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("coffeecuriosity");
    const oneUser = await db
      .collection("community")
      .updateOne({ _id: req.params.user_id }, { $set: req.body });
    return res.status(201).json({ status: 201, data: oneUser });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

module.exports = { updateUser };
