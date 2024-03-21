const paginate = require("../../utils/pagination");
const Computer = require("./Computer");
const {
    types
} = require("../../utils/constants");

const createComputer = async (computerData) => {
    const computer = new Computer(computerData);
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

module.exports = {
    createComputer,
    getAllComputers,
    getComputerById
};
