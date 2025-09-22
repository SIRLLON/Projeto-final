import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "teste" && password === "1234") {
      onLoginSuccess();
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", flexDirection:"column" }}>
      <h2>FinanSmart Web</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} /><br/>
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button type="submit">Entrar</button>
      </form>
      <p>Login simulado: user=teste, senha=1234</p>
    </div>
  );
}
