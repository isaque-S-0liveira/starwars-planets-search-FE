import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Search() {
  const {
    number,
    handleChange,
    handleClick,
    handleChangeColum,
    handleChangeComparasion,
    handleChangeNumber,
    options,
    search,
    filterMoment,
  } = useContext(PlanetsContext);
  const filteredOp = (op) => !filterMoment.find((f) => f.column === op);
  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        value={ search }
        onChange={ ({ target: { value } }) => handleChange(value) }
      />
      <select
        data-testid="column-filter"
        value={ filterMoment.column }
        onChange={ ({ target: { value } }) => handleChangeColum(value) }
      >
        {options.filter(filteredOp).map((op, i) => (
          <option key={ i } value={ op }>{op}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => handleChangeComparasion(value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ number }
        onChange={ ({ target: { value } }) => handleChangeNumber(value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar

      </button>
    </form>
  );
}

export default Search;
