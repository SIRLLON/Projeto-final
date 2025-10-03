export const exportToCsv = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("Não há transações para exportar.");
    return;
  }

  const header = "ID,Descricao,Valor\n";
  const rows = transactions
    .map(t => `${t.id},"${(t.desc || '').replace(/"/g, '""')}",${t.amount}`)
    .join("\n");

  const csvContent = '\uFEFF' + header + rows;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "transacoes.csv";
  link.click();

  URL.revokeObjectURL(url);
};
