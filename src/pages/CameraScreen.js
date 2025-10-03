import React, { useState } from "react";

export default function CameraScreen({ navigate, boleto, themeStyles, fontStyles }) {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  return (
    <div style={{ backgroundColor: themeStyles.backgroundColor, minHeight: "100vh", padding: 20 }}>
      {boleto && (
        <div style={{
          padding: 16,
          margin: 16,
          borderRadius: 8,
          textAlign: "center",
          backgroundColor: themeStyles.backgroundColor === '#222' ? '#333' : '#fff'
        }}>
          <h2 style={{ color: themeStyles.color, fontSize: fontStyles.fontSize + 4 }}>Boleto Gerado</h2>
          <p style={{ fontSize: fontStyles.fontSize + 2, color: '#f44336' }}>
            R$ {Math.abs(boleto.amount).toFixed(2)}
          </p>
          <p style={{ color: themeStyles.color, fontSize: fontStyles.fontSize }}>Status: Pendente</p>
        </div>
      )}

      {!photo ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: themeStyles.color, fontSize: fontStyles.fontSize }}>Simulação de câmera (web)</p>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          <br /><br />
          <button
            onClick={() => navigate('Dashboard')}
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: "#2196F3",
              color: "#fff",
              fontSize: fontStyles.fontSize,
              cursor: "pointer"
            }}
          >
            Voltar
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <img src={photo} alt="Preview" style={{ maxWidth: "100%", maxHeight: "60vh", marginBottom: 20 }} />
          <br />
          <button
            onClick={() => setPhoto(null)}
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: "#28a745",
              color: "#fff",
              fontSize: fontStyles.fontSize,
              cursor: "pointer",
              marginRight: 10
            }}
          >
            Tirar outra
          </button>
          <button
            onClick={() => navigate('Dashboard')}
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: "#2196F3",
              color: "#fff",
              fontSize: fontStyles.fontSize,
              cursor: "pointer"
            }}
          >
            Voltar para o Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
