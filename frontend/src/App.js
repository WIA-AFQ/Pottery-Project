import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Products from "./Products";
import Panier from "./Panier";
import Cadeaux from "./Cadeaux";
import Atelier from "./Atelier";
import Login from "./Login";
import Register from "./Register";
import AdminProducts from "./AdminProducts";
import Loginadmin from "./loginadmin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/cadeaux" element={<Cadeaux/>} />
           <Route path="/atelier" element={<Atelier/>} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/loginadmin" element={<Loginadmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;