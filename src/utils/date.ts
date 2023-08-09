export const dateParsing = (dateNum: number) => {
  const date = new Date();
  date.setTime(dateNum);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hour = date.getHours();
  const min = date.getMinutes();

  return `${year}/${month}/${day} ${hour}:${min}`;
};
