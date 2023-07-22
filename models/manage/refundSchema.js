const mongoose = require('mongoose');

const dailyLiveSchema = new mongoose.Schema({
  refund: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.Refund || mongoose.model('Refund', dailyLiveSchema);
