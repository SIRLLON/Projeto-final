export default function generatePix({ amount = 0.0, description = "Cobrança", merchant = "FinanSmart" } = {}) {
  const txid = Math.random().toString(36).substr(2, 10).toUpperCase();
  const chave = Math.random().toString(36).substr(2, 20).toLowerCase();
  const createdAt = new Date().toISOString();
  const copiaCola = `PAY:${chave}|AMT:${Number(amount).toFixed(2)}|TXID:${txid}|MSG:${description}`;
  const label = `${merchant} - Cobrança PIX\nValor: R$ ${Number(amount).toFixed(2)}\nChave: ${chave}\nTxId: ${txid}\nDescrição: ${description}\nGerado em: ${createdAt}\n\nCopia e cola:\n${copiaCola}`;
  return { chave, txid, amount: Number(amount).toFixed(2), description, merchant, createdAt, copiaCola, label };
}
