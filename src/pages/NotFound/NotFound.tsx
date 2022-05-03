import { Link } from "react-router-dom";

export default function () {
  return (
    <p style={{ padding: "1rem", background: "#C0C6BE" }}>
      <h1>Página não encontrada!</h1>
      <span>
        Tente acessar as rotas: "<Link to="/register">/register</Link>" para se
        cadastrar ou "<Link to="/">/</Link>" para fazer login.
      </span>
    </p>
  );
}
