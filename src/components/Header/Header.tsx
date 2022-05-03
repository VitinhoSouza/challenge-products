/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./Header.scss";

export default function Header() {
  const { auth, setAuthLS } = useAuth();
  const navigate = useNavigate();

  function tryLogout() {
    setAuthLS({ name: null, token: null, image: null });
    navigate("/");
  }

  return (
    <nav className="applicationHeader">
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
        {/* <button type="button">Adicionar um novo</button> */}
      </div>
    </nav>
  );
}
