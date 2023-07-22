const mongoose = require('mongoose');

const dailyLiveSchema = new mongoose.Schema({
  url: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.DailyLive || mongoose.model('DailyLive', dailyLiveSchema);
