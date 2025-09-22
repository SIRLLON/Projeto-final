import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import CameraPage from "./pages/CameraPage";

export default function App() {
  const [route, setRoute] = useState("Login");
  const [authenticated, setAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (t) => setTransactions([...transactions, t]);
  const navigate = (r) => setRoute(r);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f4f4f9" }}>
      {route === "Login" && (
        <Login onLoginSuccess={() => { setAuthenticated(true); navigate("Dashboard"); }} />
      )}
      {authenticated && route === "Dashboard" && (
        <Dashboard transactions={transactions} addTransaction={addTransaction} navigate={navigate} />
      )}
      {authenticated && route === "Reports" && <Reports navigate={navigate} />}
      {authenticated && route === "Camera" && <CameraPage navigate={navigate} />}
      <footer style={{ textAlign: "center", padding: "10px", background: "#222", color: "#fff" }}>
        TP5 - React Web
      </footer>
    </div>
  );
}
