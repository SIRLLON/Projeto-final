import React from "react";

export default function Balance({ transactions }) {
  const total = transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const containerStyle = {
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: '10px 0',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#666'
  };

  const amountStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle} aria-label="balance-container">
      <div style={titleStyle}>Saldo Total</div>
      <div style={amountStyle} aria-label="saldo-total">R$ {total.toFixed(2)}</div>
    </div>
  );
}
