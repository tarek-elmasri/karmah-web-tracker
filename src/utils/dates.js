export const formatDate = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;

  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return `${year}-${month}-${day}`;
};

export const calculateDaysBetweenDates = (firstDate, secondDate) => {
  const timeDifference =
    new Date(secondDate).getTime() - new Date(firstDate).getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};
