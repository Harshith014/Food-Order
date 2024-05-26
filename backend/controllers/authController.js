const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();


exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            email,
            password: hashedPassword,
            role
        });

        // Save user to database
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    const avatar = req.file ? req.file.path : null;

    try {
        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update avatar if included in the request
        if (avatar) {
            user.avatar = avatar;
        }

        // Update user information
        if (updates.password) {
            // If password is included in updates, hash it before updating
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // Update only the fields that are provided in the request body
        Object.keys(updates).forEach(key => {
            user[key] = updates[key];
        });

        // Save the updated user information
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user profile details
exports.getProfile = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the desired fields from the user object
        const userProfile = {
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            bio: user.bio,
            avatar: user.avatar
        };

        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
