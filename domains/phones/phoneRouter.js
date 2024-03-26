const express = require('express');
const router = express.Router();
const phoneService = require("./phoneService");

// POST endpoint to create a new computer
router.post('/', async (req, res) => {
    try {
        const phoneData = req.body.phoneData;
        const userData = req.body.userData;
        const phone = await phoneService.createPhone(phoneData,userData);
        res.status(201).json(phone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to fetch all computers
router.get('/', async (req, res) => {
    try {
        const phones = await phoneService.getAllPhones(req);
        res.json(phones);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch a computer by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const phone = await phoneService.getPhoneById(id);
        res.json(phone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body.userData;
        const phone = await phoneService.findAndDeletePhoneById(id,userData);
        res.json(phone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Export the router
module.exports = router;
