const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// ✅ GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ✅ POST create new user
router.post('/users', async (req, res) => {
    try {
        const { name, age, weight } = req.body;
        const newUser = new User({ name, age, weight });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ✅ PUT update user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, weight } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age, weight },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ✅ DELETE user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
