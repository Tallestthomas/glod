import os from 'os';
import Store from 'electron-store';

const schema = {
  currentFile: {
    type: 'string',
    default: os.homedir(),
  },
  styles: {
    type: 'object',
    default: {
      background: '#0000',
      red: '#d9534f',
      green: '#5cb85c',
      gold: '#f0ad4e',
    },
  },
};

export default new Store({ schema });
