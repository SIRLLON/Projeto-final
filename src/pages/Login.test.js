import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

const mockOnLoginSuccess = jest.fn();

const defaultProps = {
  onLoginSuccess: mockOnLoginSuccess,
  themeStyles: { backgroundColor: '#fff', color: '#000' },
  fontStyles: { fontSize: 16 },
};

describe('Testes do Componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Deve renderizar os campos e o botão de login', () => {
    render(<Login {...defaultProps} />);
    expect(screen.getByPlaceholderText('Usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
  });

  test('2. Deve permitir a digitação no campo de usuário', () => {
    render(<Login {...defaultProps} />);
    const userInput = screen.getByPlaceholderText('Usuário');
    fireEvent.change(userInput, { target: { value: 'usuario_teste' } });
    expect(userInput.value).toBe('usuario_teste');
  });

  test('3. Deve permitir a digitação no campo de senha', () => {
    render(<Login {...defaultProps} />);
    const passwordInput = screen.getByPlaceholderText('Senha');
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    expect(passwordInput.value).toBe('senha123');
  });
});

