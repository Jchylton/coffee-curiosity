const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 4000;
const { Login } = require("./Handlers/Login");
const { addRecommendation } = require("./Handlers/addRecommendation");
const { deleteRecommendation } = require("./Handlers/deleteRecommendation");
const { getRecommendation } = require("./Handlers/getRecommendation");
const { getUser } = require("./Handlers/getUser");
const { getVisited } = require("./Handlers/getVisited");
const { updateUser } = require("./Handlers/updateUser");

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.post("/login", Login);
app.get("/getvisited", getVisited);
app.get("/getuser/:user_email", getUser);
app.patch("/updateuser/:user_email", updateUser);
app.delete(
  "/deleterecommendation/:user_email/:coffee_name",
  deleteRecommendation
);
app.get("/getRecommendation/:coffee_name", getRecommendation);
app.post("/addrecommendation/:user_email", addRecommendation);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
