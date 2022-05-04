/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/require-default-props */
// import { useState } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { productsAPI } from "../../services/productsAPI";
// import InputMask from "react-input-mask";
import { IProduct } from "../../utils/interfaces";

import "./FormProduct.scss";

interface IFormProductProps {
  productProps?: IProduct;
}

export default function FormProduct({ productProps }: IFormProductProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [nome, setNome] = useState(
    productProps === undefined ? "" : productProps.nome
  );
  const [avatar, setAvatar] = useState(
    productProps === undefined ? "" : productProps.avatar
  );
  const [marca, setMarca] = useState(
    productProps === undefined ? "" : productProps.marca
  );
  const [preco, setPreco] = useState(
    productProps === undefined ? "" : productProps.preco
  );
  const [estoque, setEstoque] = useState(
    productProps === undefined ? "" : productProps.qt_estoque
  );
  const [vendas, setVendas] = useState(
    productProps === undefined ? "" : productProps.qt_vendas
  );

  //   const [price, setPrice] = useState<number>(0);

  //   function validatePrice(newPrice: string) {
  //     console.log("É ISSO", newPrice);
  //     if (newPrice.includes("e")) setPrice(0);
  //     else if (Number.isInteger(parseFloat(newPrice))) {
  //       console.log("É inteiro", parseFloat(newPrice));
  //       setPrice(parseFloat(newPrice));
  //     } else {
  //       console.log("É quebrado", parseFloat(newPrice) * 1000);
  //       setPrice(parseFloat(newPrice) * 1000);
  //     }
  //     // else {
  //     //   console.log("TRANSFORMANDO ISSO", parseFloat(newPrice));
  //     //   setPrice(parseFloat(newPrice));
  //     // }
  //   }

  function validateProductData(data: IProduct) {
    if (
      data.avatar.length === 0 ||
      data.nome.length === 0 ||
      data.marca.length === 0 ||
      data.preco.length === 0 ||
      data.qt_estoque.toString().split("").length === 0 ||
      data.qt_vendas.toString().split("").length === 0
    ) {
      alert("Erro! Todos os campos são obrigatórios!");
      return false;
    }

    if (
      data.preco.includes("e") ||
      data.qt_estoque.toString().split("").includes("e") ||
      data.qt_vendas.toString().split("").includes("e")
    ) {
      alert(
        "Erro! Certifique-se que os campos 'Preço','Estoque' e 'Vendas' não estão com o caractere 'e' ou 'E'!"
      );
      return false;
    }

    return true;
  }

  async function tryEdit(data: any) {
    let token = "";
    if (auth.token !== null) token = auth.token;

    if (validateProductData(data)) {
      const newData = data;
      newData.createdAt = productProps?.createdAt;
      newData.id = productProps?.id;
      const res = await productsAPI.editProduct(token, newData);

      if (res !== undefined) {
        alert("O produto foi editado!");
        navigate("/products");
      } else {
        alert("Atenção: Houve um erro ao editar o produto!");
      }
    }
  }

  async function tryCreate(data: any) {
    let token = "";
    if (auth.token !== null) token = auth.token;

    if (validateProductData(data)) {
      const newData = data;
      newData.createdAt = new Date();
      newData.id = Math.floor(Math.random() * 1000);
      const res = await productsAPI.createProduct(token, newData);

      if (res !== undefined) {
        alert("O produto foi cadastrado!");
        navigate("/products");
      } else {
        alert("Atenção: Houve um erro ao cadastrar o produto!");
      }
    }
  }

  /* function handlePrice(value: number) {
    console.log("OIA", value);
    setPrice(value);
  } */

  return (
    <div className="formProduct-container">
      <div className="titleFormProduct">
        <span>
          {productProps === undefined
            ? "Cadastre um novo produto"
            : `Edite o produto de Id #${productProps.id}`}
        </span>
      </div>

      <form
        onSubmit={
          productProps === undefined
            ? handleSubmit(tryCreate)
            : handleSubmit(tryEdit)
        }
      >
        <label className="labelAvatar">
          Avatar (URL)
          {/* <input
            type="file"
            accept=".jpg,.png,svg,.gif,.apng,.webp"
            {...register("avatar")}
          /> */}
          <input
            type="text"
            {...register("avatar")}
            value={avatar}
            onChange={(e: any) => setAvatar(e.target.value)}
          />
        </label>
        <label>
          Nome{" "}
          <input
            type="text"
            {...register("nome")}
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
          />
        </label>
        <label>
          Marca{" "}
          <input
            type="text"
            {...register("marca")}
            value={marca}
            onChange={(e: any) => setMarca(e.target.value)}
          />
        </label>
        <label className="moneySymbol">
          <span>R$</span>
          Preço{" "}
          <input
            type="number"
            {...register("preco")}
            value={preco}
            onChange={(e: any) => setPreco(e.target.value)}
          />
          {/* <InputMask
            mask="99,99"
            value={price}
            onChange={(e) => handlePrice(parseInt(e.target.value))}
          ></InputMask> */}
        </label>
        <label>
          Estoque{" "}
          <input
            type="number"
            {...register("qt_estoque")}
            value={estoque}
            onChange={(e: any) => setEstoque(e.target.value)}
          />
        </label>
        <label>
          Vendas{" "}
          <input
            type="number"
            {...register("qt_vendas")}
            value={vendas}
            onChange={(e: any) => setVendas(e.target.value)}
          />
        </label>

        <input
          type="submit"
          className="btn btn-primary"
          value={
            productProps === undefined ? "Cadastrar produto" : "Editar produto"
          }
        />
      </form>
    </div>
  );
}
