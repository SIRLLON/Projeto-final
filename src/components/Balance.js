import React from "react";

export default function Balance({ transactions }) {
  const total = transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  return (
    <div style={{ padding: "10px", background: "#fff", borderRadius: "6px", marginTop: "10px" }}>
      <h4>Saldo Total</h4>
      <p style={{ fontWeight: "bold" }}>R$ {total.toFixed(2)}</p>
    </div>
  );
}
