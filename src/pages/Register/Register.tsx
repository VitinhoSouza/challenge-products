/* eslint-disable no-restricted-globals */
/* eslint-disable no-else-return */
/* eslint-disable radix */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "gerador-validador-cpf";

import { postcodeAPI } from "../../services/postcodeAPI";
import { productsAPI } from "../../services/productsAPI";
import checkIcon from "../../assets/check.png";
import crossIcon from "../../assets/cross.png";

import "./Register.scss";

interface IAddress {
  city: string;
  state: string;
  publicPlace: string;
  district: string;
  complement: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [cpf, setCpf] = useState<number>();
  const [cpfIsValid, setCpfIsValid] = useState(false);
  const [postcode, setpostcode] = useState<number>();
  const [postcodeIsValid, setPostcodeIsValid] = useState(false);
  const [address, setAddress] = useState<IAddress>({} as IAddress);

  function validateCpf(newCpf: number) {
    if (newCpf.toString().split("").length <= 11) setCpf(newCpf);
    if (newCpf.toString().split("").length === 11) {
      if (validate(newCpf.toString())) {
        setCpfIsValid(true);
      } else {
        setCpfIsValid(false);
      }
    }
  }

  function dateIsValid(newDateInput: string) {
    const actualDate = new Date();
    const newDate = newDateInput.split("");

    const fullYearActualDate = parseInt(
      newDate[0] + newDate[1] + newDate[2] + newDate[3]
    );
    const fullMonthActualDate = parseInt(newDate[5] + newDate[6]);
    const fullDayActualDate = parseInt(newDate[8] + newDate[9]);

    if (
      isNaN(fullDayActualDate) ||
      isNaN(fullYearActualDate) ||
      isNaN(fullMonthActualDate)
    )
      return false;

    console.log(
      fullYearActualDate,
      fullMonthActualDate,
      fullDayActualDate,
      actualDate.getFullYear(),
      actualDate.getMonth() + 1,
      actualDate.getDate()
    );

    if (fullYearActualDate > actualDate.getFullYear()) return false;
    else if (fullYearActualDate < actualDate.getFullYear()) return true;
    else if (fullMonthActualDate > actualDate.getMonth() + 1) return false;
    else if (fullMonthActualDate < actualDate.getMonth() + 1) return true;
    else if (fullDayActualDate > actualDate.getDate()) return false;
    else if (fullDayActualDate <= actualDate.getDate()) return true;
    return true;
  }

  async function validatePostcode(postcodeRequest: number) {
    const newAddress: IAddress = {
      city: "",
      complement: "",
      state: "",
      district: "",
      publicPlace: "",
    } as IAddress;
    if (postcodeRequest.toString().split("").length <= 8)
      setpostcode(postcodeRequest);
    if (postcodeRequest.toString().split("").length === 8) {
      const res = await postcodeAPI.getPostcode(postcodeRequest);
      console.log(res);
      if (res.postcodeResponse !== undefined) {
        setAddress(res.objectAddress);
        setPostcodeIsValid(true);
      } else {
        setAddress(newAddress);
        setPostcodeIsValid(false);
      }
    } else if (postcodeRequest.toString().split("").length <= 8) {
      setPostcodeIsValid(false);
      setAddress(newAddress);
    }
  }

  async function tryRegister(data: any) {
    if (!cpfIsValid || !postcodeIsValid) {
      alert("Preencha as informações corretamente!");
    } else if (!dateIsValid(data.date)) {
      alert("A data de nascimento não está preenchida corretamente!");
    } else {
      const res = await productsAPI.registerUser(data);
      if (res === "invalid") {
        alert("Não foi possível cadastrar o usuário!");
      } else {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      alert(
        "- Atenção: nos campos 'CPF' e 'CEP' só são permitidos números (sem caracteres como: '.' e '-' ).\n" +
          "Para um CPF que é '123.456.789-00', digite '12345678900'.\n" +
          "Para um CEP que é '12345-678', digite '12345678'.\n\n" +
          "- Atenção: os campos 'Cidade', 'Estado', 'Logradouro', 'Bairro' e 'Complemento' serão carregados somente após a digitação de um CEP válido."
      );
    }, 500);
  }, []);

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
            <label className="cpf">
              CPF{" "}
              <input
                type="number"
                {...register("cpf")}
                value={cpf}
                onChange={(e: any) => validateCpf(e.target.value)}
              />
              <div className="validateValue">
                {cpfIsValid ? (
                  <img src={checkIcon} alt="O CPF é válido!" />
                ) : (
                  <img src={crossIcon} alt="O CPF é inválido!" />
                )}
              </div>
            </label>
            <label>
              Email <input type="email" {...register("email")} />
            </label>
            <label>
              Senha <input type="password" {...register("password")} />
            </label>
            <label>
              Sexo{" "}
              <select {...register("gender")}>
                <option value="f">Feminino</option>
                <option value="m">Masculino</option>
              </select>
            </label>
            <label className="date">
              <span> Data de Nascimento</span>
              <input type="date" {...register("date")} />
            </label>

            <label className="postcode">
              CEP{"  "}
              <input
                type="number"
                {...register("postcode")}
                onChange={(e: any) => validatePostcode(e.target.value)}
                value={postcode}
              />
              <div className="validateValue">
                {postcodeIsValid ? (
                  <img src={checkIcon} alt="O CEP é válido!" />
                ) : (
                  <img src={crossIcon} alt="O CEP é inválido!" />
                )}
              </div>
            </label>
            <label>
              Cidade{" "}
              <input
                type="text"
                {...register("city")}
                value={address.city}
                disabled
              />
            </label>
            <label>
              Estado{" "}
              <input
                type="text"
                {...register("state")}
                value={address.state}
                disabled
              />
            </label>
            <label>
              Logradouro{" "}
              <input
                type="text"
                {...register("publicPlace")}
                value={address.publicPlace}
                disabled
              />
            </label>
            <label>
              Bairro{" "}
              <input
                type="text"
                {...register("district")}
                value={address.district}
                disabled
              />
            </label>
            <label>
              Complemento{" "}
              <input
                type="text"
                {...register("complement")}
                value={address.complement}
                disabled
              />
            </label>
          </div>

          <input type="submit" value="Cadastrar-se" className="buttonSubmit" />

          <span className="buttonGoLogin">
            Já tem uma conta?{"  "}
            <Link to="/">Entrar</Link>`
          </span>
        </form>
      </div>
    </div>
  );
}
