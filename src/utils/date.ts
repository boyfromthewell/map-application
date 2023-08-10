type ParseType = 'feedback' | 'review';

export const dateParsing = ({
  dateNum,
  parseType,
}: {
  dateNum: number;
  parseType: ParseType;
}) => {
  const date = new Date();
  date.setTime(dateNum);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hour = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  if (parseType === 'feedback') return `${year}/${month}/${day} ${hour}:${min}`;

  if (parseType === 'review') return `${year}.${month}.${day}`;
};
