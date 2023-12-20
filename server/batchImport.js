require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const client = new MongoClient(MONGO_URI, {
  useUnifiedTopology: true,
});
const community = [
  {
    _id: 1,
    username: "Jerome",
    Email: "jerome@gmail.com",
    MemberSince: 2006,
    Recommendations: [
      {
        name: "Cafe Pyrus",
        address: "11 Chabanel",
        rating: 1,
        comment: "This place was terrible",
      },
    ],
  },
  {
    _id: 2,
    username: "Sakhia Kwemo",
    Email: "kwemos@gmail.com",
    MemberSince: 2009,
    Recommendations: [
      {
        name: "Lenjo Bakes",
        address: "11 Chabanel",
        rating: 3,
        comment: "It was aiht",
      },
    ],
  },
];

// create batch imports for users in the community
const insertCommunity = async () => {
  try {
    await client.connect();

    const db = client.db("coffeecuriosity");
    const result = await db.collection("community").insertMany(community);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

insertCommunity();
