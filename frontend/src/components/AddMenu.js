import axios from 'axios';
import React, { useState } from 'react';
import { RiImageAddLine } from 'react-icons/ri';
import '../css/AddMenu.css';

const AddMenu = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('image', image);

            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(
                `${process.env.REACT_APP_URI}/api/menu/addMenu`,
                formData,
                config
            );
            // console.log(response.data);
            setSuccessMessage('Menu has been added successfully');

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);

            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setError('');
        } catch (error) {
            console.log(error.response.data)
            if (error.response && error.response.status === 401) {
                setError('Unauthorized');
            } else {
                setError('An error occurred while adding the menu item');
            }
        }
    };

    return (
        <div className="add-menu-container" style={{ color: 'black' }}>
            <h2>Add Menu</h2>
            {successMessage && (
                <div className="success-msg">
                    <p>{successMessage}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="add-menu-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <div className="image-upload">
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <RiImageAddLine className="image-icon" />
                    </div>
                </div>
                <button type="submit" className="submit-btn">Add Menu Item</button>
                {error && <p className="error-msg">{error}</p>}
            </form>
        </div>
    );
};

export default AddMenu;
