const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
  },

  image: {
    type: String,
    required: true
  },

  averagePreparationTime: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);