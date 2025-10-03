import React from "react";
import Balance from "../components/Balance";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { sendLocalNotification } from '../utils/notifications';
import generatePix from '../utils/generatePix';

export default function Dashboard({
  transactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  navigate,
  onExport,
  onLogout,
  themeStyles,
  fontStyles
}) {

  const handlePay = () => {
    const boleto = { desc: "Boleto Fake", amount: -200 };
    addTransaction(boleto);
    sendLocalNotification("Boleto gerado", "Um boleto de R$200 foi adicionado.");
    navigate('Camera', { boleto });
  };

  const handleCharge = () => {
    const pix = generatePix({ amount: 150.00, description: "Cobrança PIX" });
    sendLocalNotification("PIX gerado", "PIX de R$150 foi adicionado.");
    navigate('Pix', { pix });
  };

  const btnStyle = (bg) => ({
    padding: 10,
    borderRadius: 6,
    margin: 4,
    backgroundColor: bg,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: fontStyles.fontSize,
    border: "none"
  });
  
  const darkMode = themeStyles.backgroundColor === '#222';

  return (
    <div style={{ padding: 16, backgroundColor: themeStyles.backgroundColor, minHeight: "100vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ color: themeStyles.color, fontSize: fontStyles.fontSize + 4 }}>Dashboard</h2>
        <button onClick={onLogout} style={btnStyle('#f44336')}>Sair</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
        <button onClick={() => navigate('Reports')} style={btnStyle('#4caf50')}>Relatórios</button>
        <button onClick={handlePay} style={btnStyle('#4caf50')}>Pagar</button>
        <button onClick={handleCharge} style={btnStyle('#4caf50')}>Cobrar</button>
        <button onClick={() => navigate('Settings')} style={btnStyle('#4caf50')}>
          ⚙️ Configurações
        </button>
      </div>

      <Balance transactions={transactions} themeStyles={themeStyles} fontStyles={fontStyles} />
      <TransactionForm addTransaction={addTransaction} themeStyles={themeStyles} fontStyles={fontStyles} />
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
        darkMode={darkMode}
      />

      <button onClick={onExport} style={{ ...btnStyle('#ff9800'), width: '100%', marginTop: 16 }}>
        Exportar Transações
      </button>
    </div>
  );
}