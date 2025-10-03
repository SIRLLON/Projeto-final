import React, { useState } from "react";

export default function TransactionForm({ addTransaction }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('despesa');

  const submit = () => {
    if (!desc || !amount) return;
    
    const numericAmount = parseFloat(amount);
    const finalAmount = type === 'despesa' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

    addTransaction({ desc, amount: finalAmount });
    
    setDesc('');
    setAmount('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.segmentedControl}>
        <button
          style={{ ...styles.segmentButton, ...(type === 'receita' ? styles.segmentActive : {}) }}
          onClick={() => setType('receita')}
        >
          <span style={{ ...(type === 'receita' ? styles.segmentTextActive : styles.segmentText) }}>Receita</span>
        </button>
        <button
          style={{ ...styles.segmentButton, ...(type === 'despesa' ? styles.segmentActive : {}) }}
          onClick={() => setType('despesa')}
        >
          <span style={{ ...(type === 'despesa' ? styles.segmentTextActive : styles.segmentText) }}>Despesa</span>
        </button>
      </div>

      <input
        aria-label="input-descricao"
        placeholder="Descrição"
        style={styles.input}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        aria-label="input-valor"
        placeholder="Valor"
        style={styles.input}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <button aria-label="btn-adicionar" style={styles.addButton} onClick={submit}>Adicionar</button>
    </div>
  );
}

const styles = {
  container: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    margin: '10px auto',
    maxWidth: 400
  },
  input: { 
    width: '100%',
    border: '1px solid #ddd', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 6,
    boxSizing: 'border-box'
  },
  segmentedControl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 5,
  },
  segmentButton: {
    flex: 1,
    maxWidth: 120,
    padding: 10,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  segmentActive: {
    backgroundColor: '#4caf50',
    borderRadius: 6,
  },
  segmentText: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  segmentTextActive: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  addButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2196F3',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  }
};
