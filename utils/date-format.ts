"use server";

const dateFormat = (date: Date | undefined, option: object) => {
  if (!date) return undefined;
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    ...option,
    timeZone: "Asia/Tokyo"
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export default dateFormat;
