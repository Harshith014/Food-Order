const express = require('express');
const MenuItem = require('../models/menuModel');
const path = require('path');
const cloudinary = require('../middleware/cloudinary');


// Get all menu items (no authentication required)
exports.allMenu = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10;  // Default page size to 10 if not provided

        // Calculate the number of items to skip based on the current page
        const skip = (page - 1) * pageSize;

        // Get the total count of menu items
        const totalItems = await MenuItem.countDocuments();

        // Fetch the menu items with pagination
        const menuItems = await MenuItem.find()
            .skip(skip)
            .limit(pageSize);

        // Send the menu items and the total number of items
        res.json({ menuItems, totalItems });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Create a new menu item (requires authentication)
exports.addMenu = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const { name, description, price } = req.body;
            let imageUrl = null;

            // Upload the image to Cloudinary if included in the request
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
            }

            // Create a new MenuItem instance
            const newItem = new MenuItem({
                name,
                description,
                price,
                image: imageUrl // Store the Cloudinary image URL in the database
            });

            // Save the new menu item to the database
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } else {
            res.status(401).json({ error: 'User is not an admin' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const { name, description, price } = req.body;
            let imageUrl = null;

            // Upload the image to Cloudinary if included in the request
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
            }

            const updatedItem = await MenuItem.findByIdAndUpdate(
                req.params.id,
                { name, description, price, image: imageUrl }, // Store the Cloudinary image URL in the database
                { new: true }
            );
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


