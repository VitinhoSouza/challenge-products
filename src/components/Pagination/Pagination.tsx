/* eslint-disable no-unused-vars */
import arrowIcon from "../../assets/arrow.svg";
import "./Pagination.scss";

interface IPaginationProps {
  actualPage: number;
  totalPages: number;
  tryGetProducts: (page: number) => void;
}

export default function Pagination({
  actualPage,
  totalPages,
  tryGetProducts,
}: IPaginationProps) {
  return (
    <>
      <button
        type="button"
        disabled={actualPage === 1}
        className={
          actualPage === 1
            ? "previewArrow-container disabled"
            : "previewArrow-container"
        }
        onClick={() => tryGetProducts(actualPage - 1)}
        title="previewArrow"
      >
        <img src={arrowIcon} alt="preview" className="previewArrow" />
      </button>
      <div className="text">
        Página
        <span title="actualPage" data-testid="actualPage">
          {" "}
          {actualPage}{" "}
        </span>
        de
        <span title="totalPages"> {totalPages} </span>
      </div>
      <button
        type="button"
        disabled={actualPage >= totalPages && true}
        className={
          actualPage >= totalPages
            ? "nextArrow-container disabled"
            : "nextArrow-container"
        }
        onClick={() => tryGetProducts(actualPage + 1)}
        data-testid="nextArrow"
      >
        <img src={arrowIcon} alt="next" className="nextArrow" />
      </button>
    </>
  );
}
