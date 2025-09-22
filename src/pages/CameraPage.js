import React, { useRef, useState } from "react";

export default function CameraPage({ navigate }) {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (err) {
      alert("Permissão da câmera negada");
    }
  };

  return (
    <div style={{ padding:"20px" }}>
      <h2>Câmera</h2>
      <button onClick={() => navigate("Dashboard")}>Voltar</button>
      {!streaming && <button onClick={startCamera}>Abrir câmera</button>}
      <video ref={videoRef} autoPlay style={{ marginTop:"10px", width:"300px" }} />
    </div>
  );
}
