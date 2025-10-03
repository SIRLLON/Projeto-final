import React, { useEffect, useState, useCallback } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Reports({ navigate, transactions: initialTransactions, darkMode, fontStyles }) {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [chartSize, setChartSize] = useState({ width: 300, height: 300 });

  const entradas = transactions.reduce((acc, t) => (t.amount > 0 ? acc + t.amount : acc), 0);
  const saidas = transactions.reduce((acc, t) => (t.amount < 0 ? acc + t.amount : acc), 0);
  const saidasAbs = Math.abs(saidas);
  const saldo = entradas + saidas;

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL", {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      const data = await res.json();
      setRates({
        USD: parseFloat(data.USDBRL.bid),
        EUR: parseFloat(data.EURBRL.bid),
      });
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar cotações. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.6, 400);
      setChartSize({ width, height: width });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRefresh = () => {
    fetchRates();
    const newTransaction = {
      id: Date.now(),
      description: "Entrada Simulada (Refresh)",
      amount: 100.0,
      type: "Entrada",
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const dataPie = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        data: [entradas, saidasAbs],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: darkMode ? "#fff" : "#333", font: { size: 14 } } },
    },
    maintainAspectRatio: false,
  };

  const bgColor = darkMode ? "#222" : "#f5f5f5";
  const summaryBg = darkMode ? "#333" : "#fff";
  const textColor = darkMode ? "#fff" : "#333";


  const baseButtonStyle = {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginRight: '8px',
  };

  const secondaryButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: darkMode ? '#555' : '#e0e0e0',
    color: darkMode ? '#fff' : '#333',
  };

  return (
    <div style={{ padding: 16, backgroundColor: bgColor, minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h2 style={{ color: textColor, ...fontStyles }}>Relatórios e Cotações</h2>

      <div style={{ backgroundColor: summaryBg, padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <h3 style={{ color: textColor, ...fontStyles }}>Resumo Financeiro</h3>
        <p>Total de Entradas: <span style={{ color: "#4CAF50", fontWeight: "bold" }}>R$ {entradas.toFixed(2)}</span></p>
        <p>Total de Saídas: <span style={{ color: "#F44336", fontWeight: "bold" }}>R$ {saidasAbs.toFixed(2)}</span></p>
        <p>Saldo Final: <strong>R$ {saldo.toFixed(2)}</strong></p>
      </div>

      <h3 style={{ color: textColor, ...fontStyles }}>Distribuição de Fluxo</h3>
      {entradas === 0 && saidasAbs === 0 ? (
        <p style={{ color: "#999" }}>Sem dados de transações para o gráfico.</p>
      ) : (
        <div style={{ backgroundColor: summaryBg, padding: 16, borderRadius: 8, marginBottom: 16, display: "flex", justifyContent: "center" }}>
          <div style={{ width: chartSize.width, height: chartSize.height }}>
            <Pie data={dataPie} options={chartOptions} />
          </div>
        </div>
      )}

      <h3 style={{ color: textColor, ...fontStyles }}>Cotações de Moedas</h3>
      <div style={{ backgroundColor: summaryBg, padding: 16, borderRadius: 8, marginBottom: 16 }}>
        {loading ? (
          <p style={{ color: textColor }}>Carregando cotações...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <p style={{ color: textColor }}>Dólar (USD): R$ {rates?.USD?.toFixed(2)}</p>
            <p style={{ color: textColor }}>Euro (EUR): R$ {rates?.EUR?.toFixed(2)}</p>
          </>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={handleRefresh} style={primaryButtonStyle}>
          Atualizar
        </button>
        <button onClick={() => navigate("Dashboard")} style={secondaryButtonStyle}>
          Voltar ao Dashboard
        </button>
      </div>

      {transactions.length > 0 && (
        <div style={{ backgroundColor: summaryBg, padding: 16, borderRadius: 8 }}>
          <h4 style={{ color: textColor, ...fontStyles }}>Última Transação Adicionada:</h4>
          <p>ID: {transactions[transactions.length - 1].id}</p>
          <p>Descrição: {transactions[transactions.length - 1].description}</p>
          <p>Valor: R$ {transactions[transactions.length - 1].amount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}