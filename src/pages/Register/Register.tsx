/* eslint-disable no-unused-vars */
// import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "gerador-validador-cpf";

// import { booksAPI } from "../../services/booksAPI";

import logoIcon from "../../assets/icon.png";

import "./Register.scss";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  function tryRegister(data: any) {
    alert(JSON.stringify(data));
    const res = validate(data.cpf);
    alert(res);
    // Fazer a API
  }

  function searchPostcode(postcode: number) {
    // alert(postcode.toString().split(""));
    if (postcode.toString().split("").length === 8) {
      alert(postcode);
    } else if (postcode.toString().split("").length >= 8) {
      alert("CEP inválido, por favor insira apenas 8 caracteres numéricos.");
    }
  }

  return (
    <div className="pageRegister">
      <div className="content">
        <div className="title">
          <span>Cadastre-se</span>
        </div>

        <form onSubmit={handleSubmit(tryRegister)} className="formRegister">
          <div className="personalData">
            <label>
              Nome <input type="text" {...register("name")} />
            </label>
            <label>
              Sobrenome <input type="text" {...register("lastName")} />
            </label>
            <label>
              CPF <input type="number" {...register("cpf")} size={11} />
            </label>
            <label>
              Email <input type="email" {...register("email")} />
            </label>
            <label>
              Senha <input type="password" {...register("password")} />
            </label>
            <label>
              Sexo
              <select {...register("gender")}>
                <option value="f">Feminino</option>
                <option value="m">Masculino</option>
              </select>
            </label>
            <label>
              Data de Nascimento <input type="date" {...register("date")} />
            </label>
          </div>

          <div className="addressData">
            <label>
              CEP{" "}
              <input
                type="number"
                {...register("postcode")}
                onInput={(e: any) => searchPostcode(e.target.value)}
                maxLength={11}
              />
            </label>
            <label>
              Cidade <input type="text" {...register("city")} />
            </label>
            <label>
              Estado <input type="text" {...register("state")} size={11} />
            </label>
            <label>
              Logradouro <input type="text" {...register("publicPlace")} />
            </label>
            <label>
              Bairro <input type="text" {...register("district")} />
            </label>
            <label>
              Complemento <input type="text" {...register("complement")} />
            </label>
          </div>

          <input type="submit" value="Cadastrar-se" className="buttonSubmit" />

          <span className="buttonRegister">
            Já tem uma conta?
            <Link to="/">Entrar</Link>`
          </span>
        </form>
      </div>
    </div>
  );
}
