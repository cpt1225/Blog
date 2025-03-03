

export const dateChange = (isoDate: Date) => {
  const date = new Date(isoDate);

  const localDate = date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: false // 24小时制
  });
  return localDate;
}