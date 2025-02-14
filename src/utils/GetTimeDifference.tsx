export const getTimeDifference = (sleepTime: string, wakeupTime: string) => {
  const [sleepHour, sleepMinute] = sleepTime.split(":").map(Number);
  const [wakeHour, wakeMinute] = wakeupTime.split(":").map(Number);

  let sleepDate = new Date();
  let wakeDate = new Date();

  sleepDate.setHours(sleepHour, sleepMinute, 0);
  wakeDate.setHours(wakeHour, wakeMinute, 0);

  // If wake-up time is earlier than sleep time, it means it is the next day
  if (wakeDate <= sleepDate) {
    wakeDate.setDate(wakeDate.getDate() + 1);
  }

  const diffInMs = wakeDate.getTime() - sleepDate.getTime();
  const diffInMinutes = diffInMs / (1000 * 60); // Convert ms to minutes
  const diffInHours = diffInMinutes / 60;
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return Math.round(diffInHours);
  // return `${hours}${minutes}`;
};
