import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import { AuthProvider } from "./hooks/useAuth";

import "./App.scss";

function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/books" element={<Home />} /> */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<>PRODUCTS</>} />

        <Route
          path="*"
          element={
            <p style={{ padding: "1rem", background: "#C0C6BE" }}>
              <h1>Página não encontrada!</h1>
              <span>
                Tente acessar as rotas: "<Link to="/register">/register</Link>"
                para se cadastrar ou "<Link to="/">/</Link>" para fazer login.
              </span>
            </p>
          }
        />
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
