import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/Edit/EditProduct";
import Delete from "./pages/Delete";
import NewInvoice from "./pages/Invoice/NewInvoice";

function App() {
  return (
    <div className="App">
     <Router>
        <NavBar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddProduct/>}/>
      <Route path="/edit/:id"  element={<EditProduct/>}/>
      <Route path="/delete/:id"  element={<Delete/>}/>
      <Route path="/newinvoice"  element={<NewInvoice/>}/>
     </Routes>
     </Router>
    </div>
  );
}

export default App;
