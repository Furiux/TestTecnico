const { Schema, model } = require("mongoose");

const MoviesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  clasification: {
      type: Schema.Types.ObjectId,
      ref: 'Clasification'
  }
});

module.exports = model("Movies", MoviesSchema);
