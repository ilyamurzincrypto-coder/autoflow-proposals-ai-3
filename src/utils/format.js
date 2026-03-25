export const fmt = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
