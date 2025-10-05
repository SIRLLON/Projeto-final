import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PixScreen from './PixScreen';

jest.mock('../utils/sharePix', () => ({
  sharePixWeb: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockAddTransaction = jest.fn();

const mockPixData = {
  txid: '12345abcde',
  chave: 'aleatoria@email.com',
  amount: '150.00',
  description: 'Teste PIX',
  createdAt: new Date().toISOString(),
};

const defaultProps = {
  navigate: mockNavigate,
  pix: null,
  addTransaction: mockAddTransaction,
  themeStyles: { backgroundColor: '#fff', color: '#000' },
  fontStyles: { fontSize: 16 },
};

describe('Testes do Componente PixScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  test('1. Deve exibir a mensagem "Nenhum PIX gerado" quando não há dados de PIX', () => {
    render(<PixScreen {...defaultProps} />);
    expect(screen.getByText('Nenhum PIX gerado ainda.')).toBeInTheDocument();
  });

  test('2. Deve exibir os detalhes do PIX quando os dados são fornecidos', () => {
    render(<PixScreen {...defaultProps} pix={mockPixData} />);
    expect(screen.getByText(/TxId: 12345abcde/)).toBeInTheDocument();
    expect(screen.getByText(/Chave: aleatoria@email.com/)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 150.00/)).toBeInTheDocument();
  });

  test('3. Deve chamar navigate ao clicar no botão "Voltar ao Dashboard"', () => {
    render(<PixScreen {...defaultProps} />);
    fireEvent.click(screen.getByText('Voltar ao Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
