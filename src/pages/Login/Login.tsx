import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { productsAPI } from "../../services/productsAPI";
import { useAuth } from "../../hooks/useAuth";

import logoIcon from "../../assets/icon.png";

import "./Login.scss";
import { showAlert } from "../../utils/alert";

export default function Login() {
  const { auth, setAuthLS } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function tryLogin(data: any) {
    const res = await productsAPI.login(data.email, data.password);
    if (res.name === "invalid" || res.name === "undefined undefined") {
      showAlert("error", "Email e/ou senha incorretos!");
    } else {
      showAlert("success", "Login realizado.");
      setAuthLS(res);
      navigate("/products");
    }
  }

  useEffect(() => {
    if (
      auth !== undefined &&
      auth.token !== "null" &&
      auth.token !== "null" &&
      auth.image !== "null"
    ) {
      navigate("/products");
    }
  }, [auth]);

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

          {/* <input type="submit" value="Entrar" className="buttonSubmit" /> */}
          <input type="submit" className="btn btn-primary" value="Entrar" />

          <span className="buttonGoRegister">
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
