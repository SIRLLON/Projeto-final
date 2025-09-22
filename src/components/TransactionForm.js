import React, { useState } from "react";

export default function TransactionForm({ addTransaction }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    addTransaction({ desc, amount: parseFloat(amount) });
    setDesc(""); setAmount("");
  };

  return (
    <form onSubmit={submit} style={{ marginTop: "10px", background: "#fff", padding: "10px", borderRadius: "6px" }}>
      <input placeholder="Descrição" value={desc} onChange={e => setDesc(e.target.value)} style={{ padding:"5px", marginRight:"5px" }} />
      <input type="number" placeholder="Valor" value={amount} onChange={e => setAmount(e.target.value)} style={{ padding:"5px", marginRight:"5px" }} />
      <button type="submit">Adicionar</button>
    </form>
  );
}
