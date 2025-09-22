import React from "react";

export default function TransactionList({ transactions }) {
  return (
    <div style={{ marginTop:"10px" }}>
      <h4>Transações</h4>
      {transactions.length === 0 && <p style={{ color:"#666" }}>Nenhuma transação</p>}
      <ul>
        {transactions.map((t, idx) => (
          <li key={idx} style={{ display:"flex", justifyContent:"space-between", background:"#fff", margin:"5px 0", padding:"5px", borderRadius:"4px" }}>
            <span>{t.desc}</span>
            <span>R$ {t.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
