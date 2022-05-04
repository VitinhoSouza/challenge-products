import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ViewProduct from "./pages/ViewProduct/ViewProduct";
import NotFound from "./pages/NotFound/NotFound";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import EditProduct from "./pages/EditProduct/EditProduct";

import { AuthProvider } from "./hooks/useAuth";
import { ProductProvider } from "./hooks/useProducts";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Home />} />
            <Route path="/products/:id" element={<ViewProduct />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
