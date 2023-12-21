"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const getVisited = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("coffeecuriosity");
    const allUsers = await db.collection("community").find().toArray();
    const visitedArray = [];
    allUsers.forEach((user) => {
      user.Recommendations.forEach((coffeeShop) => {
        if (!visitedArray.includes(coffeeShop.name)) {
          visitedArray.push(coffeeShop);
        }
      });
    });
    return res.status(201).json({ status: 201, data: visitedArray });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getVisited };
