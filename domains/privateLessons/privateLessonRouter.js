const express = require('express');
const router = express.Router();
const privateLessonService = require('./privateLessonService'); // Adjust the path as needed

// POST endpoint to create a new computer
router.post('/', async (req, res) => {
    try {
        const privateLessonData = req.body.privateLessonData;
        const userData = req.body.userData;
        const privateLesson = await privateLessonService.createPrivateLessons(privateLessonData,userData);
        res.status(201).json(privateLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to fetch all computers
router.get('/', async (req, res) => {
    try {
        const privateLesson = await privateLessonService.getAllPrivateLessons(req);
        res.json(privateLesson);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch a computer by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const privateLesson = await privateLessonService.getPrivateLessonById(id);
        res.json(privateLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint to fetch a computer by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body.userData;
        const privateLesson = await privateLessonService.findAndDeletePrivateLessonById(id,userData);
        res.json(privateLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body.userData;
        const privateLessonData = req.body.data;
        const pl = await privateLessonService.updatePrivateLessonById(id,privateLessonData,userData);
        res.json(pl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
