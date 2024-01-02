import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Using useParams to get the product ID

  const [formData, setFormData] = useState({
    productName: '',
    imageUrl: '',
    price: 0,
    description: '',
    discount_type: '',
    discount_value: null,
  });

  useEffect(() => {
    // Fetch the product details based on the product ID when the component mounts
    fetchProductDetails();
  }, [id]); // Fetch again when id changes

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8800/products/${id}`);
      const data = await response.json();

      // Update the state with fetched product details
      setFormData({
        productName: data.productName,
        imageUrl: data.imageUrl,
        price: data.price,
        description: data.description,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the product details
      const response = await fetch(`http://localhost:8800/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Product updated successfully:', data);

      // You can perform additional actions or redirect to another page after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleEditSubmit}>
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
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
