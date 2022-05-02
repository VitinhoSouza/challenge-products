import { Route, Routes, BrowserRouter } from "react-router-dom";

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

        <Route
          path="*"
          element={
            <h1 style={{ padding: "1rem" }}>
              <p>Página não encontrada!</p>
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
