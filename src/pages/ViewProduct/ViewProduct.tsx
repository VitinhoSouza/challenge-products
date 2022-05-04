/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useProduct } from "../../hooks/useProducts";
import formatDate from "../../utils/formatDate";

import "./ViewProduct.scss";

export default function ViewProduct() {
  const { product } = useProduct();
  const navigate = useNavigate();

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
    <div className="pageViewProduct">
      <SideMenu />

      <div className="pageViewProduct-container">
        <Header />
        <div className="pageViewProduct-content">
          <div className="infoProducts-container">
            <div className="infoProducts-header">
              <div className="avatarAndId">
                <img src={avatar} alt="product avatar" />
                <span className="id">
                  Id:
                  <span>{id}</span>
                </span>
              </div>

              <span className="name">
                Nome:
                <span>{nome}</span>
              </span>
            </div>
            <div className="infoProducts-body">
              <div className="infoProduct">
                <h4 className="infoTitle">Marca</h4>
                <span className="infoData">{marca}</span>
              </div>

              <div className="infoProduct">
                <h4 className="infoTitle">Data de criação</h4>
                <span className="infoData" id="dateSpan">
                  {formatDate(new Date(createdAt))}
                </span>
              </div>

              <div className="infoProduct">
                <h4 className="infoTitle">Preço</h4>
                <span className="infoData">R${preco.replace(".", ",")}</span>
              </div>

              <div className="infoProduct">
                <h4 className="infoTitle">Estoque</h4>
                <span className="infoData">{estoque}</span>
              </div>
              <div className="infoProduct">
                <h4 className="infoTitle">Vendas</h4>
                <span className="infoData">{vendas}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
