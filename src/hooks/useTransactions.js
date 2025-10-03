import { useState, useEffect } from 'react';

const TRANSACTIONS_KEY = '@FinanSmart:transactions';

const mockTransactions = [
  { id: 1, desc: 'Salário', amount: 5000 },
  { id: 2, desc: 'Conta de luz', amount: -200 },
];

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        setTransactions(mockTransactions);
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mockTransactions));
      }
    } catch (e) {
      console.error('Falha ao carregar as transações.', e);
    }
  }, []);

  const saveTransactions = (newTransactions) => {
    try {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(newTransactions));
    } catch (e) {
      console.error('Falha ao salvar as transações.', e);
    }
  };

  const addTransaction = (t) => {
    const newTransaction = { ...t, id: Date.now() };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const updateTransaction = (id, updatedTransaction) => {
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    );
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const clearTransactions = () => {
    try {
      localStorage.removeItem(TRANSACTIONS_KEY);
      setTransactions([]);
    } catch (e) {
      console.error('Falha ao limpar as transações.', e);
    }
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    clearTransactions,
  };
}
