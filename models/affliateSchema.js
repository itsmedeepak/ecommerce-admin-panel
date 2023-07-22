const mongoose = require('mongoose');

const affliates = new mongoose.Schema({
  url: {
        type: String,
        required: true
      },
});
module.exports = mongoose.models.Affiliate || mongoose.model('Affiliate', affliates);
