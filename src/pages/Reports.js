import React, { useState, useEffect } from "react";

export default function Reports({ navigate }) {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=BRL")
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding:"20px" }}>
      <h2>Relatórios</h2>
      <button onClick={() => navigate("Dashboard")}>Voltar</button>
      {!rates ? <p>Carregando...</p> : (
        <div>
          <p>Dólar (USD): {rates.USD.toFixed(2)}</p>
          <p>Euro (EUR): {rates.EUR.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
