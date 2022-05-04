import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.scss";

export default function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="sideMenu">
      {(location.pathname === "/viewProduct" ||
        location.pathname === "/createProduct" ||
        location.pathname === "/editProduct") && (
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
    </nav>
  );
}
