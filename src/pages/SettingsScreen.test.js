import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsScreen from './SettingsScreen';

const mockNavigate = jest.fn();
const mockSetDarkMode = jest.fn();
const mockSetFontSizeOption = jest.fn();

const defaultProps = {
  navigate: mockNavigate,
  darkMode: false,
  setDarkMode: mockSetDarkMode,
  fontSizeOption: 'medium',
  setFontSizeOption: mockSetFontSizeOption,
};

describe('Testes do Componente SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Deve renderizar os títulos e as seções de configuração', () => {
    render(<SettingsScreen {...defaultProps} />);
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Modo Dark')).toBeInTheDocument();
    expect(screen.getByText('Tamanho da Fonte')).toBeInTheDocument();
  });

  test('2. Deve chamar navigate ao clicar no botão "Voltar ao Dashboard"', () => {
    render(<SettingsScreen {...defaultProps} />);
    fireEvent.click(screen.getByText('Voltar ao Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('3. Deve chamar setDarkMode ao clicar no botão de modo dark', () => {
    render(<SettingsScreen {...defaultProps} />);
    const darkModeButton = screen.getByText('Desativado');
    fireEvent.click(darkModeButton);
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  test('4. Deve chamar setFontSizeOption ao clicar no botão de fonte pequena', () => {
    render(<SettingsScreen {...defaultProps} />);
    const smallFontButton = screen.getByText('Pequena');
    fireEvent.click(smallFontButton);
    expect(mockSetFontSizeOption).toHaveBeenCalledWith('small');
  });
});
