import { useLocation, useNavigate } from "react-router-dom";

import { useProduct } from "../../hooks/useProducts";
import { productsAPI } from "../../services/productsAPI";

import { useAuth } from "../../hooks/useAuth";

import "./Header.scss";
import { showAlert } from "../../utils/alert";

interface IButtonHeaderProps {
  type: "add" | "edit" | "delete";
  goToCreateProduct?: () => void;
  goToEditProduct?: () => void;
}

function ButtonHeader({
  type,
  goToCreateProduct,
  goToEditProduct,
}: IButtonHeaderProps) {
  let textSpan = "";
  let btn = "danger";
  if (type === "add") {
    textSpan = "Cadastrar";
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
      onClick={
        type === "add"
          ? goToCreateProduct
          : type === "edit"
          ? goToEditProduct
          : undefined
      }
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
    navigate("/login");
  }

  function goToEditProduct() {
    navigate("/products/" + product.id + "/edit");
  }

  function goToCreateProduct() {
    navigate("/products/create");
  }

  async function tryDeleteProduct() {
    let token = "";
    if (auth.token !== null) token = auth.token;
    const res = await productsAPI.deleteProduct(token, product.id);
    if (res !== undefined) {
      showAlert("success", "O produto foi deletado.");
      navigate("/products");
    } else {
      showAlert("error", "Houve um erro ao deletar o produto!");
    }
  }

  return (
    <nav className="applicationHeader">
      <div className="modalDelete">
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
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
              <a className="dropdown-item" href="/login" onClick={tryLogout}>
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
        {location.pathname === "/products" && (
          <ButtonHeader type="add" goToCreateProduct={goToCreateProduct} />
        )}
        {location.pathname !== "/products" &&
          !location.pathname.includes("/edit") &&
          location.pathname !== "/products/create" && (
            <>
              <ButtonHeader type="edit" goToEditProduct={goToEditProduct} />
              <ButtonHeader type="delete" />
            </>
          )}
      </div>
    </nav>
  );
}
