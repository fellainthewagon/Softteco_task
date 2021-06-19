const { isNewLine } = require("acorn");
const mongoose = require("mongoose");

const ruNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Runame", ruNameSchema);
