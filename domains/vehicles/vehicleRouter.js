const express = require('express');
const router = express.Router();
const vehicleService = require("./vehicleService");



// POST endpoint to create a new vehicle
router.post('/', async (req, res) => {
    try {
        const vehicleData = req.body.vehicleData;
        const userData = req.body.userData;
        const vehicle = await vehicleService.createVehicle(vehicleData,userData);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to fetch all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehicles(req);
        res.json(vehicles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch a computer by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await vehicleService.getVehicleById(id);
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
