// Display time in minutes/seconds based on seconds
const displayTime = seconds => {
  const min = Math.floor(seconds / 60);
  const sec = seconds - min * 60;

  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

export default displayTime;
