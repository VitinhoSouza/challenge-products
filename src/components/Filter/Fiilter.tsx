/* eslint-disable no-unused-vars */
import "./Filter.scss";

interface IFilterProps {
  filter: string;
  handleFilter: (filter: string) => void;
}

export default function Filter({ filter, handleFilter }: IFilterProps) {
  return (
    <div className="tableFilter-container">
      <input
        type="text"
        className="inputFilter"
        placeholder="Busque por um produto"
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
}
