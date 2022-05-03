/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import "./Header.scss";
import { useProduct } from "../../hooks/useProducts";
import { productsAPI } from "../../services/productsAPI";

interface IButtonHeaderProps {
  type: "add" | "edit" | "delete";
}

function ButtonHeader({ type }: IButtonHeaderProps) {
  let textSpan = "";
  let btn = "danger";
  if (type === "add") {
    textSpan = "Adicionar";
    btn = "primary";
  } else if (type === "edit") {
    textSpan = "Editar";
    btn = "warning";
  } else {
    textSpan = "Deletar";
  }
  return (
    <button
      id="newBtn"
      type="button"
      className={`btn btn-${btn}`}
      data-bs-toggle={type === "delete" ? "modal" : ""}
      data-bs-target={type === "delete" ? "#staticBackdrop" : ""}
    >
      {textSpan} produto
    </button>
  );
}

export default function Header() {
  const { auth, setAuthLS } = useAuth();
  const { product } = useProduct();
  const location = useLocation();
  const navigate = useNavigate();

  function tryLogout() {
    setAuthLS({ name: null, token: null, image: null });
    navigate("/");
  }

  async function tryDeleteProduct() {
    let token = "";
    if (auth.token !== null) token = auth.token;
    const res = await productsAPI.deleteProduct(token, product.id);
    if (res !== undefined) {
      alert("O produto foi deletado!");
      navigate("/products");
    } else {
      alert("Atenção: Houve um erro ao deletar o produto!");
    }
  }

  return (
    <nav className="applicationHeader">
      <div className="modalDelete">
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal fade" //
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true" //
            /* style={{ display: "block" }} */
            /* aria-modal="true" */
            /* role="dialog" */
          >
            <div className="modal-dialog" id="modalTextContent">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Tem certeza que deseja deletar este item?
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {`Tem certeza que deseja deletar o produto de Id #${product.id} - ${product.nome}?`}
                </div>
                <div className="modal-footer" id="modalFooter-buttons">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={tryDeleteProduct}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdownGetout">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="/" onClick={tryLogout}>
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="userInfo">
        <img src={auth.image !== null ? auth.image : ""} alt="user avatar" />
        <span>{auth.name}</span>
      </div>
      <div className="buttonActions">
        {location.pathname === "/products" && <ButtonHeader type="add" />}
        {location.pathname === "/viewProduct" && (
          <>
            <ButtonHeader type="edit" />
            <ButtonHeader type="delete" />
          </>
        )}
      </div>
    </nav>
  );
}
