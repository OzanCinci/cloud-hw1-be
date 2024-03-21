const paginate = require("../../utils/pagination");
const {validateUser} = require("../../utils/auth");
const Vehicle = require("./Vehicle");
const {
    types
} = require("../../utils/constants");


const createVehicle = async (vehicleData,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const vehicle = new Vehicle(vehicleData);
    vehicle.userContact = {
        phoneNumber: user.phoneNumber,
        email: user.email,
        name: user.name,
        surname: user.surname,
    }
    const savedVehicle = await vehicle.save();
    return savedVehicle;
};

const getAllVehicles = async (req) => {
    const vehicles = await paginate(Vehicle, req, types.VEHICLES);
    return vehicles;
};

const getVehicleById = async (id) => {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle)
        throw new Error(`Vehicle with id:${id} not found!`);
    return vehicle;
};


module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById
};
