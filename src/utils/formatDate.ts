export default function formatDate(date: Date, locale = "pt-BR") {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "short",
      timeStyle: "short",
    })
      .format(date)
      .replace(",", "/")
      .slice(0, 10);
  }