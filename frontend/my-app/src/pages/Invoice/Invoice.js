import React, { useState, useEffect } from 'react';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:8800/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.invoice_id}>
            Customer Name: {invoice.customer_name}
            <br />
            Invoice Date: {invoice.invoice_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoice;
