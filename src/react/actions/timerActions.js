import {
  START_TIMER,
  STOP_TIMER,
} from '../constants/timer';

export const startTimer = () => ({ type: START_TIMER });

export const stopTimer = () => ({ type: STOP_TIMER});

export const setSplit = (id, time) => ({
  type: 'SET_SPLIT',
  payload: {
    id,
    time
  }
})

