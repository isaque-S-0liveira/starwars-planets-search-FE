/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const optionsArr = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [planets, setPlanetsApi] = useState([]);
  const [filterMoment, setFilterMoment] = useState([]);
  const [planetsFiltered, setFilter] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [options] = useState(optionsArr);
  const [remover, setRemove] = useState(false);
  const { makeFetch } = useFetch();

  useEffect(() => {
    const fetchPlanets = async () => {
      const infoPlanets = await makeFetch();
      const { results } = infoPlanets;
      setPlanetsApi(results);
      setFilter(results);
    };
    fetchPlanets();
  }, []);
  const handleChange = (value) => {
    const filterPlanets = planets.filter((p) => p.name.includes(value));
    setFilter(filterPlanets);
  };

  const handleChangeComparasion = (value) => {
    setComparison(value);
  };

  const handleChangeColum = (value) => {
    setColumn(value);
  };

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const removeAll = () => {
    setFilterMoment([]);
    setFilter(planets);
  };

  const removeFilter = ({ target }) => {
    setRemove(true);
    const { value } = target;
    const remove = filterMoment.filter((cl) => cl.column !== value);
    setFilterMoment(remove);
    const filteredOp = options.filter((op) => !filterMoment.find((f) => f.column === op));
    setColumn(filteredOp[1]);
  };

  useEffect(() => {
    if (filterMoment.length === 0) {
      setFilter(planets);
    } else if (remover) {
      filterMoment.forEach((f) => {
        switch (f.comparison) {
        case 'maior que':
          setFilter(
            planets.filter((planet) => Number(planet[f.column]) > Number(f.number)),
          );
          break;
        case 'menor que':
          setFilter(
            planets.filter((planet) => Number(planet[f.column]) < Number(f.number)),
          );
          break;
        case 'igual a':
          setFilter(
            planets.filter((planet) => Number(planet[f.column]) === Number(f.number)),
          );
          break;
        default:
          setFilter(planets);
          break;
        }
      });
    }
  }, [filterMoment]);

  console.log(filterMoment);
  const handleClick = () => {
    const filterTest = { column, comparison, number };
    setFilterMoment((filterPrev) => [...filterPrev, filterTest]);
    console.log();
    if (comparison === 'maior que') {
      setColumn(column);
      setFilter(filterMoment.length === 0
        ? planets.filter((d) => Number(d[column]) > Number(number))
        : planetsFiltered.filter((d) => Number(d[column]) > Number(number)));
    } else if (comparison === 'menor que') {
      setColumn(column);
      setFilter(filterMoment.length === 0
        ? planets.filter((d) => Number(d[column]) < Number(number))
        : planetsFiltered.filter((d) => Number(d[column]) < Number(number)));
    } else if (comparison === 'igual a') {
      setColumn(column);
      setFilter(filterMoment.length === 0
        ? planets.filter((d) => Number(d[column]) === Number(number))
        : planetsFiltered.filter((d) => Number(d[column]) === Number(number)));
    }
    const filteredOp = options.filter((op) => !filterMoment.find((f) => f.column === op));
    setColumn(filteredOp[1]);
  };

  const values = {
    planetsFiltered,
    planets,
    number,
    filterMoment,
    handleChange,
    handleClick,
    handleChangeColum,
    handleChangeComparasion,
    handleChangeNumber,
    removeFilter,
    removeAll,
    setColumn,
    options,
    optionsArr,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
