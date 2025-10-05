import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const mockClearTransactions = jest.fn();
jest.mock('./hooks/useTransactions', () => ({
  __esModule: true,
  default: () => ({
    transactions: [],
    addTransaction: jest.fn(),
    deleteTransaction: jest.fn(),
    updateTransaction: jest.fn(),
    clearTransactions: mockClearTransactions,
  }),
}));

jest.mock('./pages/Login', () => ({ onLoginSuccess }) => (
  <div>
    <h1>Página de Login</h1>
    <button onClick={onLoginSuccess}>Fazer Login</button>
  </div>
));

jest.mock('./pages/Dashboard', () => ({ navigate, onLogout }) => (
  <div>
    <h1>Dashboard</h1>
    <button onClick={onLogout}>Sair</button>
    <button onClick={() => navigate('Reports')}>Ir para Relatórios</button>
  </div>
));

jest.mock('./pages/Reports', () => ({ navigate }) => (
  <div>
    <h1>Página de Relatórios</h1>
    <button onClick={() => navigate('Dashboard')}>Voltar para Dashboard</button>
  </div>
));

jest.mock('./pages/CameraScreen', () => () => <div>Tela da Câmera</div>);
jest.mock('./pages/PixScreen', () => () => <div>Tela Pix</div>);
jest.mock('./pages/SettingsScreen', () => () => <div>Tela de Configurações</div>);

describe('Testes de Navegação e Autenticação do App.js', () => {
  beforeEach(() => {
    mockClearTransactions.mockClear();
  });

  test('1. Deve renderizar a página de Login inicialmente', () => {
    render(<App />);
    expect(screen.getByText('Página de Login')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  test('2. Deve navegar para o Dashboard após o login ser bem-sucedido', () => {
    render(<App />);
    const loginButton = screen.getByText('Fazer Login');
    fireEvent.click(loginButton);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Página de Login')).not.toBeInTheDocument();
  });

  test('3. Deve permitir a navegação entre páginas quando autenticado', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Fazer Login'));
    const reportsButton = screen.getByText('Ir para Relatórios');
    fireEvent.click(reportsButton);
    expect(screen.getByText('Página de Relatórios')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  test('4. Deve fazer logout e voltar para a página de Login', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Fazer Login'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    const logoutButton = screen.getByText('Sair');
    fireEvent.click(logoutButton);
    expect(screen.getByText('Página de Login')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(mockClearTransactions).toHaveBeenCalledTimes(1);
  });
});

