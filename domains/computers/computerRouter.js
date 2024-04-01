const express = require('express');
const router = express.Router();
const computerService = require('./computerService'); // Adjust the path as needed

// POST endpoint to create a new computer
router.post('/', async (req, res) => {
    try {
        const computerData = req.body.computerData;
        const userData = req.body.userData;
        const computer = await computerService.createComputer(computerData,userData);
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
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch a computer by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body.userData;
        const computer = await computerService.findAndDeleteComputerById(id,userData);
        res.json(computer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body.userData;
        const computerData = req.body.data;
        const computer = await computerService.updateComputerById(id,computerData,userData);
        res.json(computer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
