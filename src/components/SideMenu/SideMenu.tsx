import { Link, useLocation } from "react-router-dom";
import "./SideMenu.scss";

export default function SideMenu() {
  const location = useLocation();

  return (
    <nav className="sideMenu">
      {location.pathname === "/viewProduct" && (
        <div className="goHome">
          <Link to="/products">Voltar para a tela inicial</Link>
        </div>
      )}
    </nav>
  );
}
