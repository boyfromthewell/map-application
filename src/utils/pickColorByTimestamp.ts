export const pickThemeByTimestamp = (timestamp: number) => {
  switch (timestamp % 4) {
    case 0:
      return 'yellow';
    case 1:
      return 'mint';
    case 2:
      return 'pink';
    case 3:
      return 'purple';
  }
  return 'yellow';
};
