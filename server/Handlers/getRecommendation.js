"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const getRecommendation = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("coffeecuriosity");
    const allUsers = await db.collection("community").find().toArray();
    const recommendationsArray = [];
    allUsers.forEach((user) => {
      user.recommendation.forEach((coffeeShop) => {
        if (coffeeShop.name == req.params.coffee_id) {
          recommendationsArray.push({
            _id: user._id,
            username: user.username,
            email: user.email,
            rating: coffeeShop.rating,
            comment: coffeeShop.comment,
          });
        }
      });
    });
    return res.status(201).json({ status: 201, data: recommendationsArray });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getRecommendation };
