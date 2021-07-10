const localDate = (date) => {
  const currentDate = new Date(date);
  const localDate = currentDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return localDate;
};

const localTime = (time) => {
  const currentTime = new Date(time);
  const localTime = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return localTime;
};

export { localTime, localDate };
