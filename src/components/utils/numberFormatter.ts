export function numberFormatter(amount: number): string {
  // cconst number = (amount / 100).toFixed(2);
  const number = amount.toFixed(2);
  const integerPart = number.split(".")[0];
  const decimalPart = number.split(".")[1];

  return `$${integerPart}.${decimalPart}`;
}
