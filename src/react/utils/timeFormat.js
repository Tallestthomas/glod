const zeroPadding = (number, size = 2) => {
  let string = String(Math.abs(number));

  while (string.length < size) { string = `0${string}`; }

  return string;
};

export const msToTime = (miliseconds) => {
  let remaining = Math.abs(miliseconds / 1000);

  const hours = parseInt(remaining / 3600, 10);

  remaining %= 3600;

  const minutes = parseInt(remaining / 60, 10);
  const seconds = parseInt(remaining % 60, 10);
  const ms = parseInt((miliseconds % 1000) / 10, 10);

  const hoursString = hours > 0 ? `${hours}:` : '';
  const minutesString = minutes > 0 ? `${minutes}:` : '';

  return `${miliseconds < 0 ? '-' : ''}${hoursString}${minutesString}${zeroPadding(seconds, minutes < 1 ? 1 : 2)}.${zeroPadding(ms)}`;
};


export const timeToMs = (time) => {
  const isNegative = time.charAt(0) === '-';
  const times = isNegative ? time.substr(1).split(':') : time.split(':');

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let milli = 0;

  if (times.length === 3) {
    hours = Number(times[0]) * 60 * 60 * 1000;
    minutes = Number(times[1]) * 60 * 1000;
  }

  if (times.length === 2) {
    minutes = Number(times[0]) * 60 * 1000;
  }

  const hasMs = times[times.length - 1].includes('.');
  if (hasMs) {
    seconds = Number(times[times.length - 1].split('.')[0]) * 1000;
    milli = Number(times[times.length - 1].split('.')[1]);
  } else {
    seconds = Number(times[times.length - 1] * 1000);
  }

  const ms = milli * (milli.length > 1 ? 10 : 100);

  const sum = hours + minutes + seconds + ms;

  return isNegative ? -sum : sum;
};
