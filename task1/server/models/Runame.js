const mongoose = require("mongoose");

const RunameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Runame", RunameSchema);
