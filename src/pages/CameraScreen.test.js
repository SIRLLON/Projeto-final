import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CameraScreen from './CameraScreen';

const mockNavigate = jest.fn();
const mockBoletoData = {
  desc: "Boleto Fake",
  amount: -200
};

const defaultProps = {
  navigate: mockNavigate,
  boleto: null,
  themeStyles: { backgroundColor: '#fff', color: '#000' },
  fontStyles: { fontSize: 16 },
};

describe('Testes do Componente CameraScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Deve renderizar a simulação de câmera quando não há boleto', () => {
    render(<CameraScreen {...defaultProps} />);
    expect(screen.getByText('Simulação de câmera (web)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
  });

  test('2. Deve exibir os detalhes do boleto quando os dados são fornecidos', () => {
    render(<CameraScreen {...defaultProps} boleto={mockBoletoData} />);
    expect(screen.getByText('Boleto Gerado')).toBeInTheDocument();
    expect(screen.getByText('R$ 200.00')).toBeInTheDocument();
  });

  test('3. Deve chamar navigate ao clicar no botão "Voltar"', () => {
    render(<CameraScreen {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Voltar/i }));
    expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
