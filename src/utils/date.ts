

export const dateChange = (isoDate:  Date) => {
  const date = new Date(isoDate);
  // 将日期转换为本地时间字符串
  const localDate = date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false // 24小时制
  });

  return localDate;
}

export const FormDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const realTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  return realTime;
}