/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Fiilter";

import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useAuth } from "../../hooks/useAuth";
import { useProduct } from "../../hooks/useProducts";
import { productsAPI } from "../../services/productsAPI";
import formatDate from "../../utils/formatDate";

import "./Home.scss";

interface IProduct {
  avatar: string;
  createdAt: string;
  id: string;
  marca: string;
  nome: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
}

function mountTableItems(products: IProduct[]) {
  const { setProduct } = useProduct();
  return products.map((product: IProduct) => (
    <tr>
      <th scope="row">{product.id}</th>
      <td className="tdAvatar">
        <img src={product.avatar} alt="avatar" />
      </td>
      <td>{product.nome}</td>
      <td>{product.marca}</td>
      <td>{formatDate(new Date(product.createdAt))}</td>
      <td>R${product.preco.replace(".", ",")}</td>
      <td>{product.qt_estoque}</td>
      <td>{product.qt_vendas}</td>
      <td id="linkToViewProduct">
        <Link to="/viewProduct" onClick={() => setProduct(product)}>
          Visualizar produto
        </Link>
      </td>
    </tr>
  ));
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Avatar</th>
        <th scope="col">Nome</th>
        <th scope="col">Marca</th>
        <th scope="col">Data de criação</th>
        <th scope="col">Preço</th>
        <th scope="col">Estoque</th>
        <th scope="col">Vendas</th>
        <th scope="col"></th>
      </tr>
    </thead>
  );
}

export default function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("");

  function turnPage(newPage: number) {
    const initial = (newPage - 1) * 15;
    const end = newPage * 15;
    setProducts(allProducts.slice(initial, end));
    setActualPage(newPage);
  }

  async function tryGetAllProducts(newFilter = "") {
    let token = "";
    if (auth.token !== null) token = auth.token;
    const res = await productsAPI.getAllProducts(token, newFilter);
    if (res.length !== undefined && res.length > 0) {
      setActualPage(1);
      setTotalPages(Math.trunc(res.length / 15) + 1);
      setAllProducts(res);
      setProducts(res.slice(0, 15));
    } else {
      setAllProducts([]);
      setProducts([]);
      setActualPage(0);
      setTotalPages(0);
    }
  }

  function handleFilter(newFilter: string) {
    setFilter(newFilter);
    tryGetAllProducts(newFilter);
  }

  useEffect(() => {
    if (
      auth !== undefined &&
      (auth.token === "null" || auth.token === "null" || auth.image === "null")
    ) {
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    tryGetAllProducts();
    turnPage(1);
  }, []);

  return (
    <div className="pageHome">
      <SideMenu />

      <div className="pageHome-container">
        <Header />
        <div className="pageHome-content">
          <div className="tableFilter">
            <Filter
              filter={filter}
              handleFilter={handleFilter}
              tryGetAllProducts={tryGetAllProducts}
            />
          </div>

          <div className="table-responsive" id="tableContainer">
            <table className="table caption-top">
              <caption>Lista de produtos</caption>
              <TableHeader />
              <tbody>{mountTableItems(products)}</tbody>
            </table>
          </div>

          <div className="tablePagination">
            <Pagination
              actualPage={actualPage}
              totalPages={totalPages}
              tryGetProducts={turnPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
