/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { productsAPI } from "../../services/productsAPI";
import { showAlert } from "../../utils/alert";
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

  function validateProductData(data: IProduct, isEdition = false) {
    if (
      (data.avatar.length === 0 && !isEdition) ||
      data.nome.length === 0 ||
      data.marca.length === 0 ||
      data.preco.length === 0 ||
      data.qt_estoque.toString().split("").length === 0 ||
      data.qt_vendas.toString().split("").length === 0
    ) {
      showAlert("error", "Todos os campos são obrigatórios!");
      return false;
    }

    if (
      data.preco.includes("e") ||
      data.qt_estoque.toString().split("").includes("e") ||
      data.qt_vendas.toString().split("").includes("e")
    ) {
      showAlert(
        "error",
        "Certifique-se que os campos 'Preço','Estoque' e 'Vendas' não estão com o caractere 'e' ou 'E'!"
      );
      return false;
    }

    return true;
  }

  async function tryEdit(data: any) {
    let token = "";
    if (auth.token !== null) token = auth.token;

    if (validateProductData(data, true)) {
      const newData = data;
      newData.createdAt = productProps?.createdAt;
      newData.id = productProps?.id;
      const res = await productsAPI.editProduct(token, newData);

      if (res !== undefined) {
        showAlert("success", "O produto foi editado.");
        navigate("/products");
      } else {
        showAlert("error", "Houve um erro ao editar o produto!");
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
        showAlert("success", "O produto foi cadastrado.");
        navigate("/products");
      } else {
        showAlert("error", "Houve um erro ao cadastrar o produto!");
      }
    }
  }

  useEffect(() => {
    if (productProps !== undefined) {
      showAlert(
        "warning",
        "Atenção: caso não seja adicionada nenhuma imagem, o avatar continuará o mesmo!"
      );
    }
  }, []);

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
          Avatar
          <input
            type="file"
            accept=".jpg,.png,svg,.gif,.apng,.webp"
            {...register("avatar")}
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
