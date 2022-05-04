import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import "./SideMenu.scss";

export default function SideMenu() {
  const location = useLocation();
  const { product } = useProduct();
  const navigate = useNavigate();

  return (
    <nav className="sideMenu">
      {location.pathname !== "/products" && (
        <div className="goHome">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/products")}
          >
            Voltar para a tela inicial
          </button>
        </div>
      )}
      {location.pathname.includes("/edit") && (
        <div className="goViewProduct">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/products/" + product.id)}
          >
            Voltar para a visualização do produto
          </button>
        </div>
      )}
    </nav>
  );
}
