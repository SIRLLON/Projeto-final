import React from "react";
import Balance from "../components/Balance";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard({ transactions, addTransaction, navigate }) {
  return (
    <div style={{ padding:"20px" }}>
      <h2>Dashboard</h2>
      <div style={{ marginBottom:"10px" }}>
        <button onClick={() => navigate("Reports")} style={{ marginRight:"5px" }}>Relatórios</button>
        <button onClick={() => navigate("Camera")}>Câmera</button>
      </div>
      <Balance transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}
