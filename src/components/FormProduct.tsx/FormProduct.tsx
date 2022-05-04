/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/require-default-props */
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { productsAPI } from "../../services/productsAPI";
// import InputMask from "react-input-mask";
import { IProduct, IProductCreateOrEdit } from "../../utils/interfaces";

import "./FormProduct.scss";

interface IFormProductProps {
  product?: IProduct;
}

export default function FormProduct({ product }: IFormProductProps) {
  const { register, handleSubmit } = useForm();

  const { auth } = useAuth();
  const navigate = useNavigate();

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

  function validateProductData(data: IProductCreateOrEdit) {
    if (
      data.avatar.length === 0 ||
      data.nome.length === 0 ||
      data.marca.length === 0 ||
      data.preco.length === 0 ||
      data.qt_estoque.length === 0 ||
      data.qt_vendas.length === 0
    ) {
      alert("Erro! Todos os campos são obrigatórios!");
      return false;
    }

    if (
      data.preco.includes("e") ||
      data.qt_estoque.includes("e") ||
      data.qt_vendas.includes("e")
    ) {
      alert(
        "Erro! Certifique-se que os campos 'Preço','Estoque' e 'Vendas' não estão com o caractere 'e' ou 'E'!"
      );
      return false;
    }

    return true;
  }

  async function tryEdit(data: any) {
    alert(data);
  }

  async function tryCreate(data: any) {
    console.log(data);

    let token = "";
    if (auth.token !== null) token = auth.token;

    const newData = data;
    let res;
    if (validateProductData(data)) {
      newData.createdAt = new Date();
      newData.id = Math.floor(Math.random() * 1000);
      res = await productsAPI.createProduct(token, newData);

      if (res !== undefined) {
        alert("Produto cadastrado com sucesso!");
        navigate("/products");
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
          {product === undefined
            ? "Adicione um novo produto"
            : `Edite o produto de Id #${product.id}`}
        </span>
      </div>

      <form
        onSubmit={
          product === undefined
            ? handleSubmit(tryCreate)
            : handleSubmit(tryEdit)
        }
      >
        <label className="labelAvatar">
          Avatar
          <input
            type="file"
            accept=".jpg,.png,svg,.gif,.apng,.webp"
            {...register("avatar")}
          />
        </label>
        <label>
          Nome <input type="text" {...register("nome")} />
        </label>
        <label>
          Marca <input type="text" {...register("marca")} />
        </label>
        <label className="moneySymbol">
          <span>R$</span>
          Preço <input type="number" {...register("preco")} />
          {/* <InputMask
            mask="99,99"
            value={price}
            onChange={(e) => handlePrice(parseInt(e.target.value))}
          ></InputMask> */}
        </label>
        <label>
          Estoque <input type="number" {...register("qt_estoque")} />
        </label>
        <label>
          Vendas <input type="number" {...register("qt_vendas")} />
        </label>

        <input
          type="submit"
          className="btn btn-primary"
          value={product === undefined ? "Adicionar produto" : "Editar produto"}
        />
      </form>
    </div>
  );
}
