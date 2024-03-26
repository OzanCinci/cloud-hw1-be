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

module.exports = {
    createComputer,
    getAllComputers,
    getComputerById,
    findAndDeleteComputerById
};
