import { openSplitFile } from '../utils';
import { updateSplits } from './timerActions';

export const initApplication = () => (dispatch) => {
  const data = openSplitFile();

  dispatch(updateSplits(data.splits));
};

export const stuff = () => {};
