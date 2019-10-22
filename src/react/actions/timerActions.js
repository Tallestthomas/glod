import {
  START_TIMER,
  STOP_TIMER,
} from '../constants/timer';

export const startTimer = () => ({ type: START_TIMER });

export const stopTimer = () => ({ type: STOP_TIMER});

export const setSplit = (index, time) => ({
  type: 'SET_SPLIT',
  payload: {
    index,
    time
  }
})

