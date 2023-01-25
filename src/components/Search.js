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
  } = useContext(PlanetsContext);

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => handleChange(value) }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => handleChangeColum(value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
