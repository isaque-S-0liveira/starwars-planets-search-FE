/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanetsApi] = useState([]);
  const [planetsFiltered, setFilter] = useState(planets);
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
  const values = { planetsFiltered, planets, handleChange };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
