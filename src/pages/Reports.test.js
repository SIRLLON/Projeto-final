import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reports from './Reports';

jest.mock('react-chartjs-2', () => ({
  Pie: () => <div>Gráfico de Pizza</div>,
}));

const mockNavigate = jest.fn();

const defaultProps = {
  navigate: mockNavigate,
  transactions: [{ id: 1, description: 'Salário', amount: 5000 }],
  darkMode: false,
  fontStyles: { fontSize: 16 },
};

global.fetch = jest.fn();

describe('Testes do Componente Reports', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  test('1. Deve mostrar o estado de carregamento inicialmente', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    render(<Reports {...defaultProps} />);
    expect(screen.getByText('Carregando cotações...')).toBeInTheDocument();
  });

  test('2. Deve fazer a chamada para a API de cotações ao renderizar', () => {
    render(<Reports {...defaultProps} />);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('3. Deve chamar a função navigate ao clicar em "Voltar ao Dashboard"', () => {
    render(<Reports {...defaultProps} />);
    fireEvent.click(screen.getByText('Voltar ao Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('4. Deve mostrar mensagem quando não há transações para o gráfico', () => {
    render(<Reports {...defaultProps} transactions={[]} />);
    expect(screen.getByText('Sem dados de transações para o gráfico.')).toBeInTheDocument();
  });
});

