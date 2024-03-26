const paginate = require("../../utils/pagination");
const {validateUser} = require("../../utils/auth");
const PrivateLesson = require("./PrivateLessons");
const {
    types
} = require("../../utils/constants");

const createPrivateLessons = async (privateLessonData,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const privateLesson = new PrivateLesson(privateLessonData);
    privateLesson.userContact = {
        phoneNumber: user.phoneNumber,
        email: user.email,
        name: user.name,
        surname: user.surname,
    }
    const saved = await privateLesson.save();
    return saved;
};

const getAllPrivateLessons = async (req) => {
    const privateLessons = await paginate(PrivateLesson, req, types.PRIVATE_LESSONS);
    return privateLessons;
};

const getPrivateLessonById = async (id) => {
    const privateLesson = await PrivateLesson.findById(id);
    if (!privateLesson)
        throw new Error(`privateLesson with id:${id} not found!`);
    return privateLesson;
};

const findAndDeletePrivateLessonById = async (id,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const privateLesson = await PrivateLesson.findById(id);
    console.log(privateLesson?.userId)
    console.log(user._id)
    if (!privateLesson || (privateLesson?.userId!=user._id && user.role!="ADMIN")) {
        throw new Error(`privateLesson with id:${id} not found!`);
    }
    // If the computer exists, delete it
    const deleted = PrivateLesson.deleteOne({ _id: id }); 
    return deleted;
};

module.exports = {
    createPrivateLessons,
    getAllPrivateLessons,
    getPrivateLessonById,
    findAndDeletePrivateLessonById,
};
