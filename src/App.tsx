import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ViewProduct from "./pages/ViewProduct/ViewProduct";
import NotFound from "./pages/NotFound/NotFound";

import { AuthProvider } from "./hooks/useAuth";

import "./App.scss";
import { ProductProvider } from "./hooks/useProducts";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Home />} />
            <Route path="/viewProduct" element={<ViewProduct />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
