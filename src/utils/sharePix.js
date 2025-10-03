export async function sharePixWeb(pixObj) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(pixObj.copiaCola);
    }
    alert(`${pixObj.label}\n\n(Código copia-e-cola copiado para o clipboard)`);
  } catch (err) {
    alert('Não foi possível compartilhar o PIX.');
  }
}
