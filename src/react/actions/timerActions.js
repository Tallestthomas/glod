import {
  SET_IS_RUNNING,
  SET_IS_PAUSED,
  SET_IS_COMPLETE,
  SHOW_CONTROLS,
  SET_SPLIT,
  START_RUN,
  COMPLETE_RUN,
} from '../constants/timer';

export const setIsRunning = (isRunning) => ({
  type: SET_IS_RUNNING,
  payload: {
    isRunning,
  },
});


export const setIsPaused = (isPaused) => ({
  type: SET_IS_PAUSED,
  payload: {
    isPaused,
  },
});

export const setIsComplete = (isComplete) => ({
  type: SET_IS_COMPLETE,
  payload: {
    isComplete,
  },
});

export const showControls = () => ({
  type: SHOW_CONTROLS,
});

export const setSplit = (time, index) => ({
  type: SET_SPLIT,
  payload: {
    time,
    index,
  },
});

export const startRun = () => ({
  type: START_RUN,
});

export const completeRun = (time) => ({
  type: COMPLETE_RUN,
  payload: {
    time,
  },
});

export const updateBestDurations = () => ({
  type: 'UPDATE_BEST_DURATIONS',
});

export const setPersonalBests = (time) => ({
  type: 'SET_PERSONAL_BESTS',
  payload: {
    time,
  },
});
