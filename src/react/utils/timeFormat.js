const zeroPadding = (number, size = 2) => {
  let string = String(number);

  while( string.length < size) { string = '0' + string }

  return string;
}

const timeFormat = (miliseconds) => {
  let remaining = miliseconds / 1000;

  const hours = parseInt(remaining / 3600, 10);

  remaining %= 3600;

  const minutes = parseInt(remaining / 60, 10);
  const seconds = parseInt(remaining % 60, 10);
  const ms = parseInt((miliseconds % 1000) / 10, 10);

  const hoursString = hours > 0 ? `${hours}:` : '';
  const minutesString = minutes > 0 ? `${minutes}:` : '';

  return `${hoursString}${minutesString}${zeroPadding(seconds, minutes < 1 ? 1 : 2)}.${zeroPadding(ms)}`
}

export default timeFormat;
