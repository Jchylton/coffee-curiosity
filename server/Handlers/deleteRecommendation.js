"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const deleteRecommendation = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("coffeecuriosity");
    const oneUser = await db
      .collection("community")
      .findOne({ Email: req.params.user_email });
    let newRecommendations = oneUser.Recommendations;
    newRecommendations = newRecommendations.filter(
      (r) => r.name !== req.params.coffee_name
    );
    const changedUser = await db
      .collection("community")
      .updateOne(
        { Email: req.params.user_email },
        { $set: { Recommendations: newRecommendations } }
      );
    return res.status(204).json({ status: 204, data: "Success" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, error: err.message });
  } finally {
    client.close();
  }
};

module.exports = { deleteRecommendation };
