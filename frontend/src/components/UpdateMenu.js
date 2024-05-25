import axios from 'axios';
import React, { useState } from 'react';

const UpdateMenu = ({ menuItem, onUpdate }) => {
    const [name, setName] = useState(menuItem.name);
    const [description, setDescription] = useState(menuItem.description);
    const [price, setPrice] = useState(menuItem.price);
    const [image, setImage] = useState(null);

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('image', image);


            const response = await axios.put(
                `https://food-order-ovjj.onrender.com/api/menu/updateMenu/${menuItem._id}`,
                formData,
                config
            );

            onUpdate(response.data);
        } catch (error) {
            console.error('Failed to update menu item:', error);
        }
    };

    return (
        <div>
            <h2>Update Menu Item</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateMenu;