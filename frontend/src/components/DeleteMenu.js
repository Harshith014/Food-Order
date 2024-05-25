import axios from 'axios';
import React from 'react';

const DeleteMenu = ({ menuItemId, onDelete }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.delete(`https://food-order-ovjj.onrender.com/api/menu/deleteMenu/${menuItemId}`, config);
      onDelete(menuItemId);
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteMenu;