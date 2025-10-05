import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';

jest.mock('../utils/notifications', () => ({
  sendLocalNotification: jest.fn(),
}));

jest.mock('../utils/generatePix', () => jest.fn(() => 'pix-code-fake'));

jest.mock('../components/Balance', () => () => <div>Componente Balance</div>);
jest.mock('../components/TransactionForm', () => () => <div>Componente TransactionForm</div>);
jest.mock('../components/TransactionList', () => () => <div>Componente TransactionList</div>);

const mockNavigate = jest.fn();
const mockOnLogout = jest.fn();
const mockAddTransaction = jest.fn();
const mockOnExport = jest.fn();

const defaultProps = {
  transactions: [],
  addTransaction: mockAddTransaction,
  deleteTransaction: jest.fn(),
  updateTransaction: jest.fn(),
  navigate: mockNavigate,
  onExport: mockOnExport,
  onLogout: mockOnLogout,
  themeStyles: { backgroundColor: '#fff', color: '#000' },
  fontStyles: { fontSize: 16 },
};

describe('Testes do Componente Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Deve renderizar todos os botões principais', () => {
    render(<Dashboard {...defaultProps} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
    expect(screen.getByText('Pagar')).toBeInTheDocument();
    expect(screen.getByText('Cobrar')).toBeInTheDocument();
    expect(screen.getByText(/Configurações/)).toBeInTheDocument();
    expect(screen.getByText('Exportar Transações')).toBeInTheDocument();
  });

  test('2. Deve chamar onLogout ao clicar em Sair', () => {
    render(<Dashboard {...defaultProps} />);
    fireEvent.click(screen.getByText('Sair'));
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  test('3. Deve chamar navigate para a página de Relatórios', () => {
    render(<Dashboard {...defaultProps} />);
    fireEvent.click(screen.getByText('Relatórios'));
    expect(mockNavigate).toHaveBeenCalledWith('Reports');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('4. Deve chamar navigate para a página de Configurações', () => {
    render(<Dashboard {...defaultProps} />);
    fireEvent.click(screen.getByText(/Configurações/));
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('5. Deve chamar onExport ao clicar em Exportar', () => {
    render(<Dashboard {...defaultProps} />);
    fireEvent.click(screen.getByText('Exportar Transações'));
    expect(mockOnExport).toHaveBeenCalledTimes(1);
  });

  test('Deve navegar para a tela PIX ao clicar em Cobrar', () => {
  render(<Dashboard {...defaultProps} />);
  fireEvent.click(screen.getByText('Cobrar'));

  expect(mockNavigate).toHaveBeenCalledWith('Pix', expect.any(Object));
});

  test('Deve navegar para a tela da Câmera ao clicar em Pagar', () => {
  render(<Dashboard {...defaultProps} />);
  fireEvent.click(screen.getByText('Pagar'));
  
  expect(mockNavigate).toHaveBeenCalledWith('Camera', expect.any(Object));
});
});
