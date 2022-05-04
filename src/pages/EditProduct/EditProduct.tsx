import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormProduct from "../../components/FormProduct.tsx/FormProduct";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useProduct } from "../../hooks/useProducts";

import "./EditProduct.scss";

export default function EditProduct() {
  const { product } = useProduct();
  const navigate = useNavigate();

  /* let productToBeViewed: IProduct = {
    avatar: "",
    createdAt: new Date().toString(),
    id: "",
    marca: "",
    nome: "",
    preco: "",
    qt_estoque: 0,
    qt_vendas: 0,
  }; */

  const [id] = useState(product.id === undefined ? "" : product.id);
  const [nome] = useState(product.nome === undefined ? "" : product.nome);
  const [avatar] = useState(product.avatar === undefined ? "" : product.avatar);
  const [createdAt] = useState(
    product.createdAt === undefined ? "" : product.createdAt
  );
  const [marca] = useState(product.marca === undefined ? "" : product.marca);
  const [preco] = useState(product.preco === undefined ? "" : product.preco);
  const [estoque] = useState(
    product.qt_estoque === undefined ? "" : product.qt_estoque
  );
  const [vendas] = useState(
    product.qt_vendas === undefined ? "" : product.qt_vendas
  );

  useEffect(() => {
    if (product.id === undefined) navigate("/products");
  }, [product]);

  return (
    <div className="pageEditProduct">
      <SideMenu />

      <div className="pageEditProduct-container">
        <Header />
        <div className="pageEditProduct-content">
          <div className="formEditProdcut-container">
            <FormProduct
              productProps={{
                avatar,
                createdAt,
                id,
                marca,
                nome,
                preco,
                qt_estoque: parseInt(estoque.toString()),
                qt_vendas: parseInt(vendas.toString()),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
