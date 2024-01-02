// Frontend: Delete.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8800/products/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setDeleteMessage(data.message);

      
      navigate('/'); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={handleDelete}>Delete</button>
      <p>{deleteMessage}</p>
    </div>
  );
};

export default Delete;
