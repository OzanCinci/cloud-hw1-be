const paginate = require("../../utils/pagination");
const {validateUser} = require("../../utils/auth");
const Phone = require("./Phone");
const {
    types
} = require("../../utils/constants");

const createPhone = async (phoneData,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const phone = new Phone(phoneData);
    phone.userContact = {
        phoneNumber: user.phoneNumber,
        email: user.email,
        name: user.name,
        surname: user.surname,
    }
    const savedPhone = await phone.save();
    return savedPhone;
};

const getAllPhones = async (req) => {
    const phones = await paginate(Phone, req, types.PHONES);
    return phones;
};

const getPhoneById = async (id) => {
    const phone = await Phone.findById(id);
    if (!phone)
        throw new Error(`Phone with id:${id} not found!`);
    return phone;
};

const findAndDeletePhoneById = async (id,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const phone = await Phone.findById(id);
    console.log(phone?.userId)
    console.log(user._id)
    if (!phone || (phone?.userId?.toString()!=user._id?.toString() && user.role!="ADMIN")) {
        throw new Error(`phone with id:${id} not found!`);
    }
    // If the vehicle exists, delete it
    const deletedPhone = Phone.deleteOne({ _id: id }); 
    return deletedPhone;
};

const updatePhoneById = async (id, phoneData, userData) => {
    const user = await validateUser(userData.password, userData.email);
    const phone = await Phone.findById(id);

    if (!phone) {
        throw new Error(`phone with id:${id} not found!`);
    }
    
    console.log("phone.userId , user._id: ",phone.userId , user._id)
    if (phone.userId.toString() !== user._id.toString()) {
        throw new Error(`User is not authorized to update this phone`);
    }

    let updateOps = {};

    Object.keys(phoneData).forEach(key => {
        updateOps[key] = phoneData[key];
    });

    Object.keys(phone.toObject()).forEach(key => {
        if (!phoneData.hasOwnProperty(key) && !['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'userContact'].includes(key)) {
            // $unset operator to remove field
            updateOps[`$unset`] = updateOps[`$unset`] || {};
            updateOps[`$unset`][key] = "";
        }
    });

    // Perform the update operation
    const updated = await Phone.findByIdAndUpdate(id, updateOps, { new: true });
    
    return updated;
};

module.exports = {
    createPhone,
    getAllPhones,
    getPhoneById,
    findAndDeletePhoneById,
    updatePhoneById
};