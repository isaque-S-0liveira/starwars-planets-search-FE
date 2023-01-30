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
  const [options, setOptions] = useState(optionsArr);
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
  const test = () => {
  //   const test1 = testFilterd();
  //   const opt = test1.forEach((el) => options.filter((op) => !op.includes(el)));
  // //  console.log(opt);
  //   console.log(test1);
  //   console.log(options);
  //   // const optionsF = filterMoment.filter(testFilterd).map((op) => op);
  //   // setOptions(optionsF);
    const filteredOp = options.filter((op) => !filterMoment.find((f) => f.column === op));
    setOptions(filteredOp.length === 1 ? [] : filteredOp);
    console.log(filteredOp);
  };

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
    test();
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
    options,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
