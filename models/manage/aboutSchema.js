const mongoose = require('mongoose');

const dailyLiveSchema = new mongoose.Schema({
  aboutus: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.AboutUs || mongoose.model('AboutUs', dailyLiveSchema);
