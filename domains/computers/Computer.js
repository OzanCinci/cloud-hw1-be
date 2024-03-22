const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String, // Optional
  brand: { type: String, required: true },
  model: String, // Optional
  year: Number, // Optional
  processor: String, // Optional
  ram: String, // Optional
  storage: {
    ssd: { type: String }, // Optional, default value set to null if not provided
    hdd: { type: String } // Optional, default value set to null if not provided
  },
  graphicsCard: String, // Optional
  operatingSystem: String, // Optional
  price: { type: Number, required: true },
  image: String, // Optional
  description: String, // Optional
  customFields: { type: Schema.Types.Mixed },
  activate: Boolean,
  showDetailToEveryOne: Boolean,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Link to User
  userContact: {
    phoneNumber: String,
    email: String,
    name: String,
    surname: String,
  }
}, { timestamps: true, strict: false }); // Enable timestamps

module.exports = mongoose.model('Computer', computerSchema);
