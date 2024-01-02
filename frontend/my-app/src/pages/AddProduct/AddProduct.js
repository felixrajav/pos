import React, { useState } from 'react';
import './AddProduct.css'
const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    imageUrl: '',
    price: 0,
    description: '',
    discount_type: '',
    discount_value: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8800/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Product added successfully:', data);

     
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleAddSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Discount Type:
          <select
            name="discount_type"
            value={formData.discount_type}
            onChange={handleInputChange}
          >
            <option value="">Select Discount Type</option>
            <option value="Flat">Flat</option>
            <option value="Percentage">Percentage</option>
            <option value="FreeProduct">Free Product</option>
          </select>
        </label>
        <br />
        <label>
          Discount Value:
          <input
            type="number"
            name="discount_value"
            value={formData.discount_value}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
