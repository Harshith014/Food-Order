const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const MenuItem = require('../models/menuModel');

// addCart: Add a menu item to the user's cart
exports.addCart = async (req, res) => {
    try {
        const { userId, menuItemId } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId });
        }

        // Find the menu item
        const menuItem = await MenuItem.findById(menuItemId);

        // Check if the item is already in the cart
        const cartItemIndex = cart.items.findIndex((item) => item.menuItemId.equals(menuItemId));

        if (cartItemIndex !== -1) {
            // Item already exists in the cart, increment its quantity
            cart.items[cartItemIndex].quantity += 1;
        } else {
            // Add a new item to the cart with quantity 1
            cart.items.push({
                menuItemId: menuItemId,
                quantity: 1,
                price: menuItem.price,
                name: menuItem.name, // Add the name of the menu item
                image: menuItem.image, // Add the image of the menu item
            });
        }

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Save the updated cart
        await cart.save();

        // Prepare the response in the desired format
        const response = cart.items.map((item) => ({
            _id: cart._id,
            userId: cart.userId,
            totalPrice: item.price * item.quantity,
            items: [item],
            __v: cart.__v
        }));

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.allCarts = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the userId is passed as a URL parameter

        // Fetch carts for the specific user from the database
        const carts = await Cart.find({ userId });

        // Check if carts exist for the user
        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'No carts found for the user' });
        }

        // Prepare the response in the desired format
        const response = carts.flatMap(cart => {
            return cart.items.map(item => ({
                _id: cart._id,
                userId: cart.userId,
                totalPrice: item.price,
                items: [item],
                __v: cart.__v
            }));
        });

        // Send the transformed carts as a response
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// updateCartItem: Update the quantity and price of an item in the user's cart
exports.updateCartItem = async (req, res) => {
    try {
        const { userId, menuItemId, action } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the menu item
        const menuItem = await MenuItem.findById(menuItemId);

        // Find the cart item
        const cartItem = cart.items.find((item) => item.menuItemId.equals(menuItemId));

        // Check if the cart item exists
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Update the quantity and price based on the action
        if (action === 'increment') {
            cartItem.quantity += 1;
            cartItem.price = menuItem.price * cartItem.quantity;
        } else if (action === 'decrement') {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                cartItem.price = menuItem.price * cartItem.quantity;
            } else {
                // Remove the item from the cart if the quantity is 1 and the action is 'decrement'
                cart.items = cart.items.filter((item) => !item.menuItemId.equals(menuItemId));
            }
        }

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// deleteCartItem: Delete a menu item from the user's cart
exports.deleteCartItem = async (req, res) => {
    try {
        const { userId, menuItemId } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the cart item
        const cartItemIndex = cart.items.findIndex((item) => item.menuItemId.equals(menuItemId));

        // Check if the cart item exists
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Remove the item from the cart
        cart.items.splice(cartItemIndex, 1);

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item deleted from cart successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};