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

const findAndDeleteVehicleById = async (id,userData) => {
    const user = await validateUser(userData.password,userData.email);
    const vehicle = await Vehicle.findById(id);
    console.log(vehicle?.userId)
    console.log(user._id)
    if (!vehicle || (vehicle?.userId?.toString()!=user._id?.toString() && user.role!="ADMIN")) {
        throw new Error(`vehicle with id:${id} not found!`);
    }
    // If the vehicle exists, delete it
    const deletedVehicle = Vehicle.deleteOne({ _id: id }); 
    return deletedVehicle;
};

const updateVehicleById = async (id, vehicleData, userData) => {
    const user = await validateUser(userData.password, userData.email);
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw new Error(`Vehicle with id:${id} not found!`);
    }
    
    console.log("vehicle.userId , user._id: ",vehicle.userId , user._id)
    if (vehicle.userId.toString() !== user._id.toString()) {
        throw new Error(`User is not authorized to update this vehicle`);
    }

    // Initialize the update operations
    let updateOps = {};

    Object.keys(vehicleData).forEach(key => {
        updateOps[key] = vehicleData[key];
    });

    Object.keys(vehicle.toObject()).forEach(key => {
        if (!vehicleData.hasOwnProperty(key) && !['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'userContact'].includes(key)) {
            // $unset operator to remove field
            updateOps[`$unset`] = updateOps[`$unset`] || {};
            updateOps[`$unset`][key] = "";
        }
    });

    // Perform the update operation
    const updated = await Vehicle.findByIdAndUpdate(id, updateOps, { new: true });
    
    return updated;
};



module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    findAndDeleteVehicleById,
    updateVehicleById
};
