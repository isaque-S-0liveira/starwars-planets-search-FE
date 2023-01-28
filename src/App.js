import React from 'react';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Search />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
