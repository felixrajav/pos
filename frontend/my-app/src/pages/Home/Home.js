
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8800/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.productName}</strong> Rs.{product.price}
            <br />
            <img src={product.imageUrl} alt={product.productName} style={{ maxWidth: '100px' }} />
            <p>{product.description}</p>
            <p>
              Discount Type: {product.discount_type}{' '}
              {product.discount_type !== null && `(${product.discount_type})`} 
              <br />
              Discount Value: {product.discount_value}
            </p>
            <Link to={`/edit/${product.id}`}>
              <button>Edit</button>
            </Link>
            <Link to={`/delete/${product.id}`}>
              <button>delete</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
