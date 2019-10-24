const zeroPadding = (number, size = 2) => {
  let string = String(Math.abs(number));

  while( string.length < size) { string = '0' + string }

  return string;
}

export const msToTime = (miliseconds) => {
  let remaining = Math.abs(miliseconds / 1000);

  const hours = parseInt(remaining / 3600, 10);

  remaining %= 3600;

  const minutes = parseInt(remaining / 60, 10);
  const seconds = parseInt(remaining % 60, 10);
  const ms = parseInt((miliseconds % 1000) / 10, 10);

  const hoursString = hours > 0 ? `${hours}:` : '';
  const minutesString = minutes > 0 ? `${minutes}:` : '';

  return `${miliseconds < 0 ? '-' : ''}${hoursString}${minutesString}${zeroPadding(seconds, minutes < 1 ? 1 : 2)}.${zeroPadding(ms)}`
}


export const timeToMs = (time) => {
  const isNegative = time.charAt(0) === '-';
  const times = isNegative ? time.substr(1).split(':') : time.split(':');
  const hours =  Number(times[0]) * 60 * 60 * 1000;
  const minutes = Number(times[1]) * 60 * 1000 ; 
  const seconds = Number(times[2].split('.')[0]) * 1000
  const mili = Number(times[2].split('.')[1]) * 10;

  const sum = hours + minutes + seconds + mili;

  return isNegative ? -sum : sum;
}
