import {
  SET_IS_RUNNING,
  SET_IS_PAUSED,
  SET_IS_COMPLETE,
  SHOW_CONTROLS,
  START_RUN,
  COMPLETE_RUN,
  SET_PERSONAL_BESTS,
} from '../constants/timer';
import { getDuration, isBestDuration } from '../utils';

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

export const startRun = () => ({
  type: START_RUN,
});

export const completeRun = (time) => ({
  type: COMPLETE_RUN,
  payload: {
    time,
  },
});

export const setPersonalBests = (time) => ({
  type: SET_PERSONAL_BESTS,
  payload: {
    time,
  },
});

export const updateSplits = (splits) => ({
  type: 'UPDATE_SPLITS',
  payload: {
    splits,
  },
});

export const updateBestDuration = (splits, index) => (dispatch) => {
  const newSplits = splits.map((split) => {
    if (split.index === index) {
      const { endedAt } = split || {};
      return {
        ...split,
        bestDuration: {
          realtimeMS: getDuration(splits, index),
        },
      };
    }
    return split;
  });

  return dispatch(updateSplits(newSplits));
};

export const setSplit = (time, index) => (dispatch, getState) => {
  const { timerReducer } = getState();
  const { splits } = timerReducer || {};

  const newSplits = splits.map((split) => {
    if (split.index === index) {
      return {
        ...split,
        endedAt: {
          realtimeMS: time,
        },
      };
    }
    return split;
  });

  if (isBestDuration(newSplits, index)) {
    return dispatch(updateBestDuration(newSplits, index));
  }

  return dispatch(updateSplits(newSplits));
};
