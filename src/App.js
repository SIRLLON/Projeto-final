import React, { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import CameraScreen from "./pages/CameraScreen";
import PixScreen from "./pages/PixScreen";
import SettingsScreen from "./pages/SettingsScreen";
import useTransactions from "./hooks/useTransactions";
import { exportToCsv } from './utils/exportToCsv';

import './App.css';

export default function App() {
  return <AppContent />;
}

function AppContent() {
  const [route, setRoute] = useState('Login');
  const [routeParams, setRouteParams] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSizeOption, setFontSizeOption] = useState('medium');

  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    clearTransactions
  } = useTransactions();

  const navigate = (r, params = null) => {
    setRoute(r);
    setRouteParams(params);
  };

  const handleLogout = () => {
    clearTransactions();
    setAuthenticated(false);
    setRoute('Login');
  };

  const handleAddTransaction = (t) => addTransaction(t);
  const handleDeleteTransaction = (id) => deleteTransaction(id);
  const handleUpdateTransaction = (id, updatedData) => updateTransaction(id, updatedData);
  const handleExport = () => exportToCsv(transactions);

  const themeStyles = {
    backgroundColor: darkMode ? '#222' : '#f4f4f9',
    color: darkMode ? '#fff' : '#000'
  };

  const fontStyles = {
    fontSize: fontSizeOption === 'small' ? 14 : fontSizeOption === 'medium' ? 18 : 22
  };

  return (
    <div className="app-container" style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.color, minHeight: '100vh', padding: '20px' }}>
      {route === 'Login' && (
        <Login
          onLoginSuccess={() => { setAuthenticated(true); navigate('Dashboard'); }}
          themeStyles={themeStyles}
          fontStyles={fontStyles}
        />
      )}

      {authenticated && route === 'Dashboard' && (
        <Dashboard
          transactions={transactions}
          addTransaction={handleAddTransaction}
          deleteTransaction={handleDeleteTransaction}
          updateTransaction={handleUpdateTransaction}
          navigate={navigate}
          onLogout={handleLogout}
          onExport={handleExport}
          themeStyles={themeStyles}
          fontStyles={fontStyles}
        />
      )}

      {authenticated && route === 'Reports' && (
        <Reports
          transactions={transactions}
          navigate={navigate}
          themeStyles={themeStyles}
          fontStyles={fontStyles}
        />
      )}

      {authenticated && route === 'Camera' && (
        <CameraScreen
          navigate={navigate}
          boleto={routeParams?.boleto}
          addTransaction={handleAddTransaction}
          themeStyles={themeStyles}
          fontStyles={fontStyles}
        />
      )}

      {authenticated && route === 'Pix' && (
        <PixScreen
          navigate={navigate}
          pix={routeParams?.pix}
          addTransaction={handleAddTransaction}
          themeStyles={themeStyles}
          fontStyles={fontStyles}
        />
      )}

      {authenticated && route === 'Settings' && (
        <SettingsScreen
          navigate={navigate}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          fontSizeOption={fontSizeOption}
          setFontSizeOption={setFontSizeOption}
        />
      )}
    </div>
  );
}
