"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const deleteUser = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("coffeecuriosity");
    const oneUser = await db
      .collection("community")
      .deleteOne({ _id: req.params.user_id });
    return res.status(204).json({ status: 204, data: "Success" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

module.exports = { deleteUser };
