import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());
const port = 8800;


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "saleofpoint",
  insecureAuth: true
});

app.get('/products', (req, res) => {
  const q = "SELECT * FROM product";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/products', (req, res) => {
  const { productName, imageUrl, price, description, discount_type, discount_value } = req.body;

  const q = "INSERT INTO product (productName, imageUrl, price, description, discount_type, discount_value) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [productName, imageUrl, price, description, discount_type, discount_value];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    return res.json({ message: "Product added successfully", productId: result.insertId });
  });
});


app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { productName, imageUrl, price, description, discount_type, discount_value } = req.body;

  const q = "UPDATE product SET productName=?, imageUrl=?, price=?, description=?, discount_type=?, discount_value=? WHERE id=?";
  const values = [productName, imageUrl, price, description, discount_type, discount_value, productId];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    return res.json({ message: "Product updated successfully" });
  });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  const q = "DELETE FROM product WHERE id=?";
  const values = [productId];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    return res.json({ message: "Product deleted successfully" });
  });
});



app.get('/invoices', (req, res) => {
  const q = "SELECT * FROM invoices";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


app.post('/invoices', (req, res) => {
  const { customer_name, invoice_date, items } = req.body;

  const productIds = items.map(item => item.product_id);
  const checkProductsQuery = "SELECT COUNT(*) as count FROM products WHERE id IN (?)";
  
  db.query(checkProductsQuery, [productIds], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    const productCount = result[0].count;

    if (productCount !== productIds.length) {
      
      return res.status(400).json({ error: "Invalid product IDs in the items array" });
    }

   
    const insertInvoiceQuery = "INSERT INTO invoices (customer_name, invoice_date) VALUES (?, ?)";
    const invoiceValues = [customer_name, invoice_date];

    db.query(insertInvoiceQuery, invoiceValues, (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }

      const invoiceId = result.insertId;

      const insertItemsQuery = "INSERT INTO invoice_items (invoice_id, product_id, quantity, unit_price, total_price) VALUES ?";
      const itemsValues = items.map(item => [invoiceId, item.product_id, item.quantity, item.unit_price, item.total_price]);

      db.query(insertItemsQuery, [itemsValues], (err, result) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }

        return res.json({ message: "Invoice created successfully", invoiceId });
      });
    });
  });
});


app.get('/invoices/:id', (req, res) => {
  const invoiceId = req.params.id;
  const q = "SELECT * FROM invoices WHERE invoice_id = ?";
  db.query(q, [invoiceId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data[0]); 
  });
});


app.post('/invoice_items', (req, res) => {
  const { invoice_id, product_id, quantity, unit_price, total_price } = req.body;

  const insertItemQuery = "INSERT INTO invoice_items (invoice_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)";
  const values = [invoice_id, product_id, quantity, unit_price, total_price];

  db.query(insertItemQuery, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    return res.json({ message: "Invoice item created successfully", itemId: result.insertId });
  });
});


app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
