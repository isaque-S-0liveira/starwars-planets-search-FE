/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanetsApi] = useState([]);
  const [planetsFiltered, setFilter] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
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

  const handleClick = () => {
    const err = 'deu ruim';
    const filterNumbers = planets.filter((p) => {
      switch (comparison) {
      case 'maior que':
        return Number(p[column]) > Number(number);
      case 'menor que':
        return Number(p[column]) < Number(number);
      case 'igual a':
        return Number(p[column]) === Number(number);
      default:
        return err;
      }
    });
    setFilter(filterNumbers);
  };

  const values = {
    planetsFiltered,
    planets,
    number,
    handleChange,
    handleClick,
    handleChangeColum,
    handleChangeComparasion,
    handleChangeNumber,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
