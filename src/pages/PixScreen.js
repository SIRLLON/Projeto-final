import React, { useEffect, useState } from "react";
import { sharePixWeb as sharePix } from '../utils/sharePix';


export default function PixScreen({ navigate, pix, addTransaction, themeStyles, fontStyles }) {
  const [registered, setRegistered] = useState(false);
  const [pixRecord, setPixRecord] = useState(pix || null);

  useEffect(() => {
    if (pix && !registered) {
      const record = {
        id: `pix-${Date.now()}`,
        txid: pix.txid,
        chave: pix.chave,
        amount: Number(pix.amount),
        description: pix.description,
        createdAt: pix.createdAt,
        status: 'Pago'
      };
      setPixRecord(record);

      addTransaction({ desc: `PIX recebido ${pix.txid}`, amount: Number(pix.amount) });

      alert(`Pagamento de R$ ${Number(pix.amount).toFixed(2)} efetuado.`);

      setRegistered(true);
    }
  }, [pix, registered, addTransaction]);

  const handleShare = async () => {
    if (!pix) {
      alert('Nenhum PIX para compartilhar.');
      return;
    }
    await sharePix(pix);
  };

  const cardBackground = themeStyles.backgroundColor === '#222' ? '#333' : '#fff';

  const btnStyle = (bg) => ({
    backgroundColor: bg,
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: fontStyles.fontSize,
    border: "none",
    width: "100%",
    marginBottom: 10
  });

  return (
    <div style={{ padding: 16, backgroundColor: themeStyles.backgroundColor, minHeight: "100vh" }}>
      <h2 style={{ color: themeStyles.color, fontSize: fontStyles.fontSize + 4, marginBottom: 16 }}>
        Área PIX
      </h2>

      {pixRecord ? (
        <div style={{ padding: 16, borderRadius: 8, marginBottom: 16, backgroundColor: cardBackground }}>
          <p style={{ color: themeStyles.color, fontSize: fontStyles.fontSize }}>TxId: {pixRecord.txid}</p>
          <p style={{ color: themeStyles.color, fontSize: fontStyles.fontSize }}>Chave: {pixRecord.chave}</p>
          <p style={{ fontSize: fontStyles.fontSize + 2, fontWeight: 'bold', color: '#4caf50' }}>
            R$ {Number(pixRecord.amount).toFixed(2)}
          </p>
          <p style={{ color: themeStyles.color, fontSize: fontStyles.fontSize }}>
            Status: {pixRecord.status}
          </p>
        </div>
      ) : (
        <div style={{ padding: 16, borderRadius: 8, marginBottom: 16, backgroundColor: cardBackground, textAlign: 'center' }}>
          <p style={{ color: themeStyles.color, fontSize: fontStyles.fontSize }}>
            Nenhum PIX gerado ainda.
          </p>
        </div>
      )}

      <button style={btnStyle('#2196F3')} onClick={handleShare}>
        Compartilhar PIX
      </button>

      <button style={btnStyle('#9e9e9e')} onClick={() => navigate('Dashboard')}>
        Voltar ao Dashboard
      </button>
    </div>
  );
}
