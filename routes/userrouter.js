const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const users = require("../models/userschema");
const axios = require("axios").default;
//router
//to display all users
router.get("/", (req, res) => {
  users.find((err, data) => {
    if (err) throw err;
    console.log("data sent to client");
    res.json(data);
  });
});
//to display a user
router.get("/:id", (req, res) => {
  users.find({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
//create a user
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
//delete a user
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
//update a user
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
