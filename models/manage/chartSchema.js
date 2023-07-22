const mongoose = require("mongoose");

const chartSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    script: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    trend: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Chart || mongoose.model("Chart", chartSchema);
