const { Schema, model } = require("mongoose");

const ClasificationSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = model("Clasification", ClasificationSchema);