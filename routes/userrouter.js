const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const users = require("../models/userschema");
const axios = require("axios").default;
//router
//to display all users
router.get("/", async (req, res) => {
  const resp = await users.find((err, data) => {
    if (err) throw err;
    console.log("data sent to client");
  });
  res.json(resp);
});
//create user
router.post("/", (req, res) => {
  try {
    var user = new users({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      place: req.body.place,
    });
    const saveData = user.save();
    res.json(user);
    console.log(saveData);
  } catch (err) {
    res.json({
      err: err,
    });
    console.log(err);
  }
});
//delete users
router.delete("/:id", (req, res) => {
  users.remove(
    {
      _id: req.params.id,
    },
    (err, data) => {
      if (err) throw err;
      res.json(data);
    }
  );
});
//update users
router.put("/:id", (req, res) => {
  users.update(
    {
      _id: req.params.id,
    },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place: req.body.place,
      },
    },
    (err, data) => {
      if (err) throw err;
      res.json(data);
    }
  );
});
module.exports = router;
