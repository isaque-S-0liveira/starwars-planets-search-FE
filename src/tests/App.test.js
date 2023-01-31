import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
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
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('se a aplicação faz a requisição a api assim que o usuario acesssa', () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('Se ao renderizar App os planetas aparecem', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock),
    });
    render(<App />);
    await waitFor(() => {
      const cell = screen.getByRole('cell', { name: /tatooine/i });
      expect(cell).toBeInTheDocument();
    });
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

  test('testa o filtro por nome', async () => {
    render(<App />);
    const searchName = screen.getByRole('textbox');
    expect(searchName).toBeInTheDocument();
    userEvent.type(searchName, 'aa');
  });

  test('adiciona o filtro surface_water "menor que" 2 e dps o remove', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    act(() => {
      userEvent.selectOptions(columnFilter, 'surface_water');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(numberFilter, '2');
      userEvent.click(buttonFilter);
    });
    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /bespin/i,
      })).toBeInTheDocument();
      const bttRemoveFilter = screen.getByRole('button', {
        name: /x/i,
      });
      act(() => {
        userEvent.click(bttRemoveFilter);
      });
      expect(screen.getByRole('cell', {
        name: /alderaan/i,
      })).toBeInTheDocument();
    });
  });
  test('adc o filtro população "maior que" 100000000000 e depois o remove', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    act(() => {
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(numberFilter, '100000000000');
      userEvent.click(buttonFilter);
    });
    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /coruscant/i,
      })).toBeInTheDocument();
      const bttRemoveFilter = screen.getByRole('button', {
        name: /x/i,
      });
      act(() => {
        userEvent.click(bttRemoveFilter);
      });
      expect(screen.getByRole('cell', {
        name: /alderaan/i,
      })).toBeInTheDocument();
    });
  });
  test('adc o filtro três filtros e testa se a tabela é atualizada', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    act(() => {
      userEvent.selectOptions(columnFilter, 'surface_water');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(numberFilter, '8');
      userEvent.click(buttonFilter);
    });
    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /dagobah/i,
      })).toBeInTheDocument();
    });
    act(() => {
      userEvent.selectOptions(columnFilter, 'rotation_period');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.type(numberFilter, '24');
      userEvent.click(buttonFilter);
    });
    await waitFor(() => {
      expect(screen.getByRole('cell', {
        name: /dagobah/i,
      })).not.toBeInTheDocument();
    });
  });
  test('testa o filtro "menor que" ', () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(numberFilter, '2');
    userEvent.click(buttonFilter);
    // const planetName = screen.getByRole('cell', {
    //   name: /tatooine/i,
    // });
    // expect(planetName).toBeInTheDocument();
  });
  test('adiciona filtro e depois o remove', async () => {
    render(<App />);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    act(() => {
      userEvent.type(numberFilter, '5');
      userEvent.click(buttonFilter);
    });

    await waitFor(() => {
      const bttRemoveFilter = screen.getByRole('button', {
        name: /x/i,
      });
      userEvent.click(bttRemoveFilter);
    });
  });
  test('testa se o botão de remover todos os filtros funciona', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(numberFilter, '2');
    userEvent.click(buttonFilter);
    const removeAll = screen.getByTestId('button-remove-filters');
    userEvent.click(removeAll);
  });
  test('Adicionar um filtro e depois remover esse filtro', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId(COLUMN_FILTER);
    const comparisonFilter = screen.getByTestId(COMPARASION_FILTER);
    const numberFilter = screen.getByTestId(VALUE_FILTER);
    const buttonFilter = screen.getByTestId(BUTTON_FILTER);
    act(() => {
      userEvent.selectOptions(columnFilter, 'rotation_period');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.clear(numberFilter);
      userEvent.type(numberFilter, '200');
      userEvent.click(buttonFilter);
    });

    await waitFor(() => {
      const bttRemoveFilter = screen.getByRole('button', {
        name: /x/i,
      });
      userEvent.click(bttRemoveFilter);
    });
  });
});
