import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";

export default function Login({ onLoginSuccess, themeStyles, fontStyles }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "teste" && password === "1234") {
      onLoginSuccess();
    } else {
      window.alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: themeStyles.backgroundColor,
      padding: 20
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 12,
        padding: 24,
        backgroundColor: themeStyles.backgroundColor === '#222' ? '#333' : '#fff',
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center", fontSize: fontStyles.fontSize + 14, color: themeStyles.color }}>
          FinanSmart
        </h1>
        <p style={{ textAlign: "center", fontSize: fontStyles.fontSize, color: themeStyles.color, marginBottom: 24 }}>
          Acesse sua conta
        </p>

        <div style={{ display: "flex", alignItems: "center", marginBottom: 12, backgroundColor: "#f3f3f3", borderRadius: 8, padding: 10 }}>
          <FiUser size={20} color={themeStyles.color} style={{ marginRight: 10 }} />
          <input
            aria-label="login-usuario"
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ flex: 1, height: 40, fontSize: fontStyles.fontSize, color: themeStyles.color, background: "transparent", border: "none", outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", marginBottom: 12, backgroundColor: "#f3f3f3", borderRadius: 8, padding: 10 }}>
          <FiLock size={20} color={themeStyles.color} style={{ marginRight: 10 }} />
          <input
            aria-label="login-senha"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ flex: 1, height: 40, fontSize: fontStyles.fontSize, color: themeStyles.color, background: "transparent", border: "none", outline: "none" }}
          />
        </div>

        <button
          aria-label="btn-login"
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 8,
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "bold",
            fontSize: fontStyles.fontSize,
            cursor: "pointer",
            marginTop: 10
          }}
        >
          Entrar
        </button>

        <p style={{ marginTop: 16, textAlign: "center", fontSize: fontStyles.fontSize - 4, color: themeStyles.color }}>
          Login simulado: user=teste, senha=1234
        </p>
      </div>
    </div>
  );
}
