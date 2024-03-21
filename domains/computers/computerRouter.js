const express = require('express');
const router = express.Router();
const computerService = require('./computerService'); // Adjust the path as needed

// POST endpoint to create a new computer
router.post('/', async (req, res) => {
    try {
        const computer = await computerService.createComputer(req.body);
        res.status(201).json(computer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to fetch all computers
router.get('/', async (req, res) => {
    try {
        const computers = await computerService.getAllComputers(req);
        res.json(computers);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch a computer by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const computers = await computerService.getComputerById(id);
        res.json(computers);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
