const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

   imagePath: {
    type: String,
    required: true
  },

  creator: {
    type: String,
    required: true
  },

  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // address1: {
  //   type: String,
  // },

  // address2: {
  //   type: String,
  // },

  // city: {
  //   type: String,
  // },

  // state: {
  //   type: String,
  // },

  // postcode: {
  //   type: String,
  // },

  // country: {
  //   type: String,
  // },

  lat: {
    type: Number,
  },

  lng: {
    type: Number,
  }
}

);

module.exports = mongoose.model('Image', imageSchema );

