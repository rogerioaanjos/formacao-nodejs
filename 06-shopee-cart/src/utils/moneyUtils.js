// src/utils/moneyUtils.js

function formatBRL(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatBRLRounded(value) {
  return formatBRL(Number(value.toFixed(2)));
}

export { formatBRL, formatBRLRounded };
