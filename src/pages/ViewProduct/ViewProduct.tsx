/* eslint-disable react/require-default-props */
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useProduct } from "../../hooks/useProducts";
import formatDate from "../../utils/formatDate";

import "./ViewProduct.scss";

export default function ViewProduct() {
  const { product } = useProduct();

  return (
    <div className="pageViewProduct">
      <SideMenu />

      <div className="pageViewProduct-container">
        <Header />
        <div className="pageViewProduct-content">
          <div className="infoProducts-container">
            <div className="infoProducts-header">
              <div className="avatarAndId">
                <img src={product.avatar} alt="product avatar" />
                <span className="id">
                  Id:
                  <span>{product.id}</span>
                </span>
              </div>

              <span className="name">
                Nome:
                <span>{product.nome}</span>
              </span>
            </div>
            <div className="infoProducts-body">
              <div className="infoProduct">
                <h4 className="infoTitle">Marca</h4>
                <span className="infoData">{product.marca}</span>
              </div>

              <div className="infoProduct">
                <h4 className="infoTitle">Data de criação</h4>
                <span className="infoData" id="dateSpan">
                  {formatDate(new Date(product.createdAt))}
                </span>
              </div>

              <div className="infoProduct">
                <h4 className="infoTitle">Preço</h4>
                <span className="infoData">
                  R${product.preco.replace(".", ",")}
                </span>
              </div>

              <div className="infoProduct">
                <h4 className="infoTitle">Estoque</h4>
                <span className="infoData">{product.qt_estoque}</span>
              </div>
              <div className="infoProduct">
                <h4 className="infoTitle">Vendas</h4>
                <span className="infoData">{product.qt_vendas}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
