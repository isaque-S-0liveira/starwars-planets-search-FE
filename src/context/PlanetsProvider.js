/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanetsApi] = useState([]);

  const { makeFetch } = useFetch();

  useEffect(() => {
    const fetchPlanets = async () => {
      const infoPlanets = await makeFetch();
      const { results } = infoPlanets;
      return setPlanetsApi(results);
    };
    fetchPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
