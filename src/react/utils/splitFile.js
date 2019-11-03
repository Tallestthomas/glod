import fs from 'fs';
import config from './config';

export const openSplitFile = () => {
  const filePath = config.get('currentFile');

  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const saveSplitFile = (splits) => {
  const filePath = config.get('currentFile');
  const splitsString = JSON.stringify({ splits });

  fs.writeFileSync(filePath, splitsString);
};
