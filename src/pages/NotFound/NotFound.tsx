import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  });
  return (
    <p
      style={{ textAlign: "center", paddingTop: "5rem", background: "#edf7f6" }}
    >
      <h1>Página não encontrada!</h1>
      <span>Aguarde, estamos lhe redirencionando para a página inicial...</span>
    </p>
  );
}
