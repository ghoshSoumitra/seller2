const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
 
  address: {
    type: String
  },
  gst: {
    type: String
  },
  logo: {
    type: String
  },
  storeTimings: {
    type: String
  },

});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
