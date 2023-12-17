export function numberFormatter(amount: number): string {
  // cconst number = (amount / 100).toFixed(2);
  let number = "";
  if (amount < 0) {
    number = (-amount).toFixed(2);
  } else {
    number = amount.toFixed(2);
  }
  const decimalPart = number.split(".")[1];
  const integerPart = number.split(".")[0];

  return amount > 0
    ? `$${integerPart}.${decimalPart}`
    : `-$${integerPart}.${decimalPart}`;
}
