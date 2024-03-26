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
    if (!phone || (phone?.userId!=user._id && user.role!="ADMIN")) {
        throw new Error(`phone with id:${id} not found!`);
    }
    // If the vehicle exists, delete it
    const deletedPhone = Phone.deleteOne({ _id: id }); 
    return deletedPhone;
};

module.exports = {
    createPhone,
    getAllPhones,
    getPhoneById,
    findAndDeletePhoneById
};