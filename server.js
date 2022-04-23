//imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const userrouter = require("./routes/userrouter");
const users = require("./models/userschema");
const morgan = require("morgan");
const path = require("path");
require("dotenv/config");
//middleware
app.use(cors());
app.use(morgan("dev"));
//body-parser
app.use(express.json());
//router-config
app.use("/users", userrouter);
//router

//server
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
//production
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//db-connnection
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://dharwin:9715928749@dharwin.wkbz4.mongodb.net/user-managment-system?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      throw err;
      console.log(err);
    }
    console.log("DB connected");
  }
);
