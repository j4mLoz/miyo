export function formatCurrencyDisplay(
  amount: number,
  currency: string = "EUR",
) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

// 👉 para inputs (lo que escribe el usuario)
export function formatCurrencyInput(value: string) {
  const cleaned = value.replace(/\D/g, "");
  const number = Number(cleaned || "0");

  return new Intl.NumberFormat("es-ES").format(number);
}

// 👉 para enviar a backend
export function parseCurrency(value: string) {
  return Number(value.replace(/\./g, ""));
}
