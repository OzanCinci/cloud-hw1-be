const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: String, // Optional
    brand: String, // Optional
    model: String, // Optional
    year: Number, // Optional
    color: String, // Optional
    engineDisplacement: String, // Optional
    fuelType: String, // Optional
    transmissionType: String, // Optional
    mileage: String, // Optional
    price: { type: Number, required: true },
    image: String, // Optional
    description: String, // Optional
    customFields: { type: Schema.Types.Mixed },
    activate: Boolean, // Optional
    showDetailToEveryOne: Boolean, // Optional
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Link to User
    userContact: {
        phoneNumber: String,
        email: String,
        name: String,
        surname: String,
    }
}, { timestamps: true, strict: false }); // Enable timestamps

module.exports = mongoose.model('Vehicle', vehicleSchema);
