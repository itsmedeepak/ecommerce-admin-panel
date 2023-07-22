const mongoose = require("mongoose");

const socialAccountSchema = new mongoose.Schema({
  whatsapp: {
    type: String,
    required: true,
  },
  teligram: {
    type: String,
    required: true,
  },
  discord: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.SocialAccount || mongoose.model("SocialAccount", socialAccountSchema);