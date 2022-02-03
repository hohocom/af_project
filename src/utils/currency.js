export function currency(number) {
  return new Intl.NumberFormat("ko", {
    // style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(number);
}
