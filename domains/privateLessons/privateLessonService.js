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
    if (!privateLesson || (privateLesson?.userId?.toString()!=user._id?.toString() && user.role!="ADMIN")) {
        throw new Error(`privateLesson with id:${id} not found!`);
    }
    // If the computer exists, delete it
    const deleted = PrivateLesson.deleteOne({ _id: id }); 
    return deleted;
};

const updatePrivateLessonById = async (id, plData, userData) => {
    const user = await validateUser(userData.password, userData.email);
    const privateLesson = await PrivateLesson.findById(id);

    if (!privateLesson) {
        throw new Error(`privateLesson with id:${id} not found!`);
    }
    
    console.log("privateLesson.userId , user._id: ",privateLesson.userId , user._id)
    if (privateLesson.userId.toString() !== user._id.toString()) {
        throw new Error(`User is not authorized to update this privateLesson`);
    }

    let updateOps = {};

    Object.keys(plData).forEach(key => {
        updateOps[key] = plData[key];
    });

    Object.keys(privateLesson.toObject()).forEach(key => {
        if (!plData.hasOwnProperty(key) && !['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'userContact'].includes(key)) {
            // $unset operator to remove field
            updateOps[`$unset`] = updateOps[`$unset`] || {};
            updateOps[`$unset`][key] = "";
        }
    });

    // Perform the update operation
    const updated = await PrivateLesson.findByIdAndUpdate(id, updateOps, { new: true });
    
    return updated;
};

module.exports = {
    createPrivateLessons,
    getAllPrivateLessons,
    getPrivateLessonById,
    findAndDeletePrivateLessonById,
    updatePrivateLessonById
};
