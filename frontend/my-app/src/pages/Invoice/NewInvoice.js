import React, { useState, useEffect } from 'react';
import './NewInvoice.css'

const NewInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8800/products');
      const data = await response.json();
      setAvailableProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addNewItem = async () => {
    if (product.trim() === '' || quantity <= 0) {
      alert('Please enter a valid product and quantity.');
      return;
    }

    const selectedProduct = availableProducts.find((prod) => prod.productName === product);

    if (!selectedProduct) {
      alert('Selected product not found.');
      return;
    }

    const total = selectedProduct.price * quantity;

    const newItem = {
      product,
      quantity,
      price: selectedProduct.price,
      discount_type: 'Percentage', 
      discount_value: 0, 
      total,
    };

    setItems([...items, newItem]);
    setProduct('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateOverallTotal = () => {
    const overallTotal = items.reduce((total, item) => total + item.total, 0);
    return overallTotal;
  };
  const createInvoice = async () => {
    try {
      const response = await fetch('http://localhost:8800/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: customerName,
          invoice_date: invoiceDate,
          items: items,
        }),
      });

      const data = await response.json();

      // Handle the response data as needed
      console.log(data);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div>
      <h2>Create New Invoice</h2>
      <label>
        Customer Name:
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </label>
      <br />
      <label>
        Invoice Date:
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
      </label>
      <br />

      <h3>Invoice Items</h3>
      <label>
        Product:
        <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <button onClick={addNewItem}>Add Item</button>

      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount Type</th>
            <th>Discount Value</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount_type}</td>
              <td>{item.discount_value}</td>
              <td>{item.total}</td>
              <td>
                <button onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <strong>Overall Total:</strong> {calculateOverallTotal()}
      </div>
      <button onClick={createInvoice}>Create Invoice</button>
    </div>
  );
};

export default NewInvoice;
