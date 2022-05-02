/* eslint-disable no-unused-vars */
// import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// import { booksAPI } from "../../services/booksAPI";
import { useAuth } from "../../hooks/useAuth";

import logoIcon from "../../assets/icon.png";

import "./Login.scss";

export default function Login() {
  const { auth, setAuthLS } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  function tryLogin(data: any) {
    alert(JSON.stringify(data));
    // Fazer a API
  }

  return (
    <div className="pageLogin">
      <div className="content">
        <div className="title">
          <img src={logoIcon} alt="Product Store" />
          <span>Products Store</span>
        </div>

        <form onSubmit={handleSubmit(tryLogin)} className="formLogin">
          <label>
            Email <input type="email" {...register("email")} />
          </label>
          <label>
            Senha <input type="password" {...register("password")} />
          </label>

          <input type="submit" value="Entrar" className="buttonSubmit" />

          <span className="buttonRegister">
            Não tem uma conta?
            <Link to="/register">Cadastre-se</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
