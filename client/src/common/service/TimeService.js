export const browserDateFormat = () => {
  const typeMap = {
    day: "DD",
    month: "MM",
    year: "YYYY",
  };

  return new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(new Date())
    .map((part) => typeMap[part.type] || part.value)
    .join("");
};
