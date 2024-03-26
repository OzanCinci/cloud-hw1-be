const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateLessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tutorName: String,
    lessons: [{
        type: String
    }],
    location: String,
    duration: String,
    price: { type: Number, required: true },
    image: String,
    description: String,
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
}, { timestamps: true, strict: false });

const PrivateLesson = mongoose.model('PrivateLesson', privateLessonSchema);

module.exports = PrivateLesson;
