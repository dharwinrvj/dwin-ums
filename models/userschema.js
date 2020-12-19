const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
   firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  place: { type: String, require: true },
});
module.exports = mongoose.model("users", userSchema);
