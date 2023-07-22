const mongoose = require('mongoose');

const dailyLiveSchema = new mongoose.Schema({
  terms: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.Terms || mongoose.model('Terms', dailyLiveSchema);
