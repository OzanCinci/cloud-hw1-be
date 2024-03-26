const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brand: String,
    model: String, // Optional
    year: Number, // Optional
    operatingSystem: String, // Optional
    processor: String, // Optional
    ram: String,
    storage: String,
    cameraSpecifications: {
        main: { type: String },
        front: { type: String },
        periscopeTelephoto: { type: String },
        telephoto: { type: String },
        ultraWide: { type: String } // Optional based on phone model
    },
    batteryCapacity: String,
    price: { type: Number, required: true },
    image: String, // Optional,
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

module.exports = mongoose.model('Phone', phoneSchema);
