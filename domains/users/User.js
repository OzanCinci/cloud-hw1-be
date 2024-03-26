const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  phoneNumber: String,
  favorites: {
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
    computers: [{ type: Schema.Types.ObjectId, ref: 'Computer' }],
    privateLessons: [{ type: Schema.Types.ObjectId, ref: 'PrivateLesson' }],
    phones: [{ type: Schema.Types.ObjectId, ref: 'Phone' }]
  }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('User', userSchema);
