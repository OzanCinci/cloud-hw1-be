const express = require('express');
const router = express.Router();
const userService = require("./userService");



// POST endpoint to sign up
router.post('/sign-up', async (req, res) => {
    try {
        const response = await userService.signUp(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// POST endpoint to log in
router.post('/log-in', async (req, res) => {
    try {
        const response = await userService.logIn(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST endpoint to log in
router.delete('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        await userService.deleteUser(req.body,email);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Export the router
module.exports = router;
