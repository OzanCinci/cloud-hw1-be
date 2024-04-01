const paginate = require("../../utils/pagination");
const {validateUser} = require("../../utils/auth");
const Computer = require("./Computer");
const {
    types
} = require("../../utils/constants");

const createComputer = async (computerData,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const computer = new Computer(computerData);
    computer.userContact = {
        phoneNumber: user.phoneNumber,
        email: user.email,
        name: user.name,
        surname: user.surname,
    }
    computer.userId = user._id;
    const savedComputer = await computer.save();
    return savedComputer;
};

const getAllComputers = async (req) => {
    const computers = await paginate(Computer, req, types.COMPUTERS);
    return computers;
};

const getComputerById = async (id) => {
    const computer = await Computer.findById(id);
    if (!computer)
        throw new Error(`Computer with id:${id} not found!`);
    return computer;
};

const findAndDeleteComputerById = async (id,userData) => {
    console.log("userData: ",userData);
    const user = await validateUser(userData.password,userData.email);
    const computer = await Computer.findById(id);
    console.log(computer?.userId)
    console.log(user._id)
    if (!computer || (computer?.userId!=user._id && user.role!="ADMIN")) {
        throw new Error(`Computer with id:${id} not found!`);
    }
    // If the computer exists, delete it
    const deletedComputer = Computer.deleteOne({ _id: id }); 
    return deletedComputer;
};


const updateComputerById = async (id, computerData, userData) => {
    const user = await validateUser(userData.password, userData.email);
    const computer = await Computer.findById(id);

    if (!computer) {
        throw new Error(`computer with id:${id} not found!`);
    }
    
    console.log("computer.userId , user._id: ",computer.userId?.toString() , user?._id.toString())
    if (computer.userId?.toString() !== user._id?.toString()) {
        throw new Error(`User is not authorized to update this computer`);
    }
    // Initialize the update operations
    let updateOps = {};

    // Set new and existing fields from computerData
    Object.keys(computerData).forEach(key => {
        updateOps[key] = computerData[key];
    });

    // Unset fields that are not in computerData
    Object.keys(computer.toObject()).forEach(key => {
        if (!computerData.hasOwnProperty(key) && !['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'userContact'].includes(key)) {
            // $unset operator to remove field
            updateOps[`$unset`] = updateOps[`$unset`] || {};
            updateOps[`$unset`][key] = "";
        }
    });

    // Perform the update operation
    const updated = await Computer.findByIdAndUpdate(id, updateOps, { new: true });
    
    return updated;
};

module.exports = {
    createComputer,
    getAllComputers,
    getComputerById,
    findAndDeleteComputerById,
    updateComputerById
};
