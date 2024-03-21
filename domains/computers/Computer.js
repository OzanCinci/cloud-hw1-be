const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String, // Optional
  brand: { type: String, required: true },
  model: String, // Optional
  year: Number, // Optional
  processor: String, // Optional
  ram: String, // Optional
  storage: String, // Optional
  graphicsCard: String, // Optional
  operatingSystem: String, // Optional
  price: { type: Number, required: true },
  image: String, // Optional
  description: String, // Optional
}, { timestamps: true }); // Enable timestamps

module.exports = mongoose.model('Computer', computerSchema);
