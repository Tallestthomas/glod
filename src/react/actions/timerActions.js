import {
  START_TIMER,
  STOP_TIMER,
  SHOW_CONTROLS,
} from '../constants/timer';

export const startTimer = () => ({ type: START_TIMER });

export const stopTimer = () => ({ type: STOP_TIMER});

export const showControls = () => ({
  type: SHOW_CONTROLS
})
