/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanetsApi] = useState([]);
  const [filterMoment, setFilterMoment] = useState([]);
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

  // const filterTest = { column, comparison, number };
  // setFilterMoment((filterPrev) => [...filterPrev, filterTest]);
  // filterMoment.map((inf) => {
  //   console.log(inf);
  //   if (inf.comparison === 'maior que') {
  //     const filter = planets.filter((p) => Number(p[column]) > Number(number));
  //     setFilter(filter);
  //   } if (inf.comparison === 'menor que') {
  //     const filter = planets.filter((p) => Number(p[column]) < Number(number));
  //     setFilter(filter);
  //   } if (inf.comparison === 'igual a') {
  //     const filter = planets.filter((p) => Number(p[column]) === Number(number));
  //     setFilter(filter);
  //   }
  //   return planets;
  // });

  const handleClick = () => {
    const filterTest = { column, comparison, number };
    setFilterMoment((filterPrev) => [...filterPrev, filterTest]);
    if (comparison === 'maior que') {
      setFilter(filterMoment.length === 0
        ? planets.filter((d) => Number(d[column]) > Number(number))
        : planetsFiltered.filter((d) => Number(d[column]) > Number(number)));
    } else if (comparison === 'menor que') {
      setFilter(filterMoment.length === 0
        ? planets.filter((d) => Number(d[column]) < Number(number))
        : planetsFiltered.filter((d) => Number(d[column]) < Number(number)));
    } else if (comparison === 'igual a') {
      setFilter(filterMoment.length === 0
        ? planets.filter((d) => Number(d[column]) === Number(number))
        : planetsFiltered.filter((d) => Number(d[column]) === Number(number)));
    }
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
  };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
