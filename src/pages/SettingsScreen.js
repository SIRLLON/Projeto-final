import React from "react";

export default function SettingsScreen({ navigate, darkMode, setDarkMode, fontSizeOption, setFontSizeOption }) {
  const containerStyle = {
    padding: 16,
    minHeight: "100vh",
    backgroundColor: darkMode ? "#222" : "#f5f5f5",
    fontFamily: "sans-serif"
  };

  const titleStyle = { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: darkMode ? "#fff" : "#333" };
  const sectionStyle = { marginBottom: 20 };
  const labelStyle = { fontSize: 16, marginBottom: 8, color: darkMode ? "#fff" : "#333" };
  const buttonStyle = { padding: 10, borderRadius: 8, marginRight: 10, border: "none", cursor: "pointer", color: "#fff", fontWeight: "bold" };
  const backButtonStyle = { marginTop: 20, padding: 10, borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: "#9e9e9e", color: "#fff", fontWeight: "bold" };

  const activeStyle = { backgroundColor: "#4caf50" };
  const inactiveStyle = { backgroundColor: "#2196F3" };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Configurações</h2>

      <div style={sectionStyle}>
        <div style={labelStyle}>Modo Dark</div>
        <button
          style={{ ...buttonStyle, ...(darkMode ? activeStyle : inactiveStyle) }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Ativado" : "Desativado"}
        </button>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>Tamanho da Fonte</div>
        <button
          style={{ ...buttonStyle, ...(fontSizeOption === "small" ? activeStyle : inactiveStyle) }}
          onClick={() => setFontSizeOption("small")}
        >
          Pequena
        </button>
        <button
          style={{ ...buttonStyle, ...(fontSizeOption === "medium" ? activeStyle : inactiveStyle) }}
          onClick={() => setFontSizeOption("medium")}
        >
          Média
        </button>
      </div>

      <button style={backButtonStyle} onClick={() => navigate("Dashboard")}>
        Voltar ao Dashboard
      </button>
    </div>
  );
}
