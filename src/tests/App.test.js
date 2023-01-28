import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mock from '../mock/mock';

const COLUMN_FILTER = 'column-filter';
const COMPARASION_FILTER = 'comparison-filter';
const VALUE_FILTER = 'value-filter';
const BUTTON_FILTER = 'button-filter';

describe('Testa a aplicação e...', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(mock),
      })
    ));
  });

  test('se renderiza os inputs de pesquisa corretos', () => {
    render(<App />);

    const searchName = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);

    expect(searchName).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(numberFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });
  test('se a aplicação faz a requisição a api assim que o usuario acesssa', () => {
    // const planet = {
    //   name: 'Alderaan',
    // };
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(planet),
    // }));
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('testa o filtro por nome', async () => {
    const searchName = screen.getByTestId('name-filter');
    userEvent.type(searchName, 'aa');
    const rederedPlanet = await screen.findByText('Alderaan');
    expect(rederedPlanet).toBeInTheDocument();
  });
  test('testa o filtro "igual a"', async () => {
    // const planet = {
    //   name: 'Alderaan',
    // };
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(planet),
    // }));
    render(<App />);

    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(numberFilter, '2000000000');
    userEvent.click(buttonFilter);

    const population = await screen.getByRole('cell', {
      name: /2000000000/i,
    });
    expect(population).toBeInTheDocument();
  });
  test('testa o filtro "maior que" ', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(numberFilter, '5000');
    userEvent.click(buttonFilter);
    const orbitalPeriod = await screen.getByRole('cell', {
      name: /5110/i,
    });
    expect(orbitalPeriod).toBeInTheDocument();
  });
  test('testa o filtro "menor que" ', () => {
    render(<App />);
  });
});
