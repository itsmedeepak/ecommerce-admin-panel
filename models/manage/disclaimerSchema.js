const mongoose = require('mongoose');

const dailyLiveSchema = new mongoose.Schema({
  disclaimer: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.Disclaimer || mongoose.model('Disclaimer', dailyLiveSchema);
