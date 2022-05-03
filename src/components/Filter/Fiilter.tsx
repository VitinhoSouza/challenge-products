/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import "./Filter.scss";

interface IFilterProps {
  filter: string;
  handleFilter: (filter: string) => void;
  tryGetAllProducts: (filter: string) => void;
}

export default function Filter({
  filter,
  handleFilter,
  tryGetAllProducts,
}: IFilterProps) {
  return (
    <div className="tableFilter-container">
      <input
        type="text"
        className="inputFilter"
        placeholder="Busque por um produto"
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
      />
      <div className="buttonFilter" onClick={() => tryGetAllProducts(filter)}>
        Buscar
      </div>
    </div>
  );
}
