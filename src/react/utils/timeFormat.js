const zeroPadding = (number, size = 2) => {
  let string = String(number);

  while( string.length < size) { string = '0' + string }

  return string;
}

const timeFormat = (miliseconds) => {
  let remaining = miliseconds / 1000;

  const hour = parseInt(remaining / 3600, 10);

  remaining %= 3600;

  const minutes = parseInt(remaining / 60, 10);
  const seconds = parseInt(remaining % 60, 10);
  const ms = parseInt((miliseconds % 1000) / 100, 10);

  return `${zeroPadding(hour)}:${zeroPadding(minutes)}:${zeroPadding(seconds)}.${zeroPadding(ms)}`
}

export default timeFormat;
