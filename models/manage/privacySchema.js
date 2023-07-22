const mongoose = require('mongoose');

const dailyLiveSchema = new mongoose.Schema({
  privacy: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.Privacy || mongoose.model('Privacy', dailyLiveSchema);
