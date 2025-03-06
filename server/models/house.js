const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  code: String,
});

// Use the default collection name ('houses')
module.exports = mongoose.model("House", houseSchema);
