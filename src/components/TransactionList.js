import React from 'react';

export default function TransactionList({ transactions, darkMode, onDelete, onUpdate }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [editDesc, setEditDesc] = React.useState('');
  const [editAmount, setEditAmount] = React.useState('');

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditDesc(transaction.desc);
    setEditAmount(String(transaction.amount));
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  const saveEdit = () => {
    if (!selectedTransaction) return;
    const numericAmount = parseFloat(editAmount);
    if (isNaN(numericAmount)) {
      alert("Por favor, insira um valor numérico válido.");
      return;
    }
    onUpdate(selectedTransaction.id, { desc: editDesc, amount: numericAmount });
    closeModal();
  };

  const itemBackgroundColor = darkMode ? '#333' : '#fff';
  const textColor = darkMode ? '#fff' : '#212121';
  const emptyTextColor = darkMode ? '#999' : '#666';
  const modalBackgroundColor = darkMode ? '#424242' : '#fff';
  const inputBorderColor = darkMode ? '#555' : '#ddd';

  const styles = {
    container: { marginTop: 20 },
    title: { fontWeight: 'bold', marginBottom: 8, color: textColor, fontSize: '1.2em' },
    item: {
      backgroundColor: itemBackgroundColor,
      color: textColor,
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemInfo: { flex: 1 },
    buttonsContainer: { display: 'flex', gap: '8px' },
    actionButton: {
      padding: '6px 8px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: '#4caf50',
      color: 'white',
      fontSize: '16px'
    },
    emptyText: { color: emptyTextColor },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: modalBackgroundColor,
      padding: '24px',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '400px',
    },
    modalTitle: { color: textColor, fontWeight: 'bold', fontSize: '1.1em', marginBottom: '16px' },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '12px',
      borderRadius: '6px',
      border: `1px solid ${inputBorderColor}`,
      backgroundColor: 'transparent',
      color: textColor,
      boxSizing: 'border-box'
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '16px',
    },
    modalButton: {
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    cancelButton: { backgroundColor: '#9e9e9e', color: 'white' },
    saveButton: { backgroundColor: '#4caf50', color: 'white' },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Transações</h3>
      {transactions.length === 0 ? (
        <p style={styles.emptyText}>Nenhuma transação</p>
      ) : (
        transactions.map((item) => (
          <div key={item.id} style={styles.item}>
            <div style={styles.itemInfo}>
              <span>{item.desc}</span>
              <br />
              <span style={{ color: item.amount < 0 ? '#F44336' : '#4CAF50', fontWeight: 'bold' }}>
                R$ {Number(item.amount).toFixed(2)}
              </span>
            </div>
            <div style={styles.buttonsContainer}>
              <button onClick={() => openEditModal(item)} style={styles.actionButton} aria-label="Editar">✏️</button>
              <button onClick={() => onDelete(item.id)} style={styles.actionButton} aria-label="Deletar">🗑️</button>
            </div>
          </div>
        ))
      )}

      {modalVisible && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h4 style={styles.modalTitle}>Editar Transação</h4>
            <input
              placeholder="Descrição"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Valor"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              style={styles.input}
            />
            <div style={styles.modalActions}>
              <button onClick={closeModal} style={{ ...styles.modalButton, ...styles.cancelButton }}>
                Cancelar
              </button>
              <button onClick={saveEdit} style={{ ...styles.modalButton, ...styles.saveButton }}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}