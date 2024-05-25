const express = require('express');
const MenuItem = require('../models/menuModel');
const path = require('path');


// Get all menu items (no authentication required)
exports.allMenu = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new menu item (requires authentication)
exports.addMenu = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            // Check if an image file was uploaded

            // Extract data from the request body
            const { name, description, price } = req.body;
            const image = req.file ? req.file.path : null;

            // Create a new MenuItem instance
            const newItem = new MenuItem({
                name,
                description,
                price,
                image // Store the image path in the database
            });

            // Save the new menu item to the database
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } else {
            // If the user is not an admin, return unauthorized error
            res.status(401).json({ error: 'User is not an admin' });
        }
    } catch (error) {
        // If any error occurs, return unauthorized error
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Update a menu item (requires authentication)
exports.updateMenu = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const { name, description, price } = req.body;
            const image = req.file ? req.file.path : null;
            const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, {
                name,
                description,
                price,
                image // Store the image path in the database
            }, { new: true });
            res.json(updatedItem);

        } else {
            res.status(401).json({ error: 'User is not an admin' });
        }

    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Delete a menu item (requires authentication)
exports.deleteMenu = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            await MenuItem.findByIdAndDelete(req.params.id);
            res.status(204).json({ message: 'Order created successfully' });
        } else {
            res.status(401).json({ error: 'User is not an admin' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};


