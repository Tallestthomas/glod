import {
  SET_IS_PAUSED,
  SET_IS_RUNNING,
  SET_IS_COMPLETE,
  SHOW_CONTROLS,
  SET_SPLIT,
  START_RUN,
  UPDATE_BEST_DURATIONS,
  SET_PERSONAL_BESTS,
} from '../constants/timer';
import { openSplitFile } from '../utils';

const initialState = {
  isRunning: false,
  isPaused: false,
  isComplete: false,
  showControls: true,
  comparisons: [],
  splits: openSplitFile().splits,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_CONTROLS: {
      return {
        ...state,
        showControls: !state.showControls,
      };
    }
    case SET_IS_RUNNING: {
      const { isRunning } = payload;

      return {
        ...state,
        isRunning,
      };
    }
    case SET_IS_PAUSED: {
      const { isPaused } = payload;

      return {
        ...state,
        isPaused,
      };
    }
    case SET_IS_COMPLETE: {
      const { isComplete } = payload;

      return {
        ...state,
        isComplete,
      };
    }
    case SET_SPLIT: {
      const { newSplits } = payload || {};

      return {
        ...state,
        splits: newSplits,
      };
    }

    case START_RUN: {
      const { splits } = state;
      const resetSplits = splits.map((split) => ({
        ...split,
        endedAt: {
          realtimeMS: 0,
        },
      }));

      return {
        ...state,
        isRunning: true,
        isPaused: false,
        isComplete: false,
        comparisons: [],
        splits: resetSplits,
      };
    }

    case UPDATE_BEST_DURATIONS: {
      return {
        ...state,
      };
    }

    case SET_PERSONAL_BESTS: {
      const { splits } = state || {};
      const { time } = payload || {};

      const pbInMs = splits[splits.length - 1].personalBest.realtimeMS;

      const newSplits = (time > pbInMs && pbInMs !== 0) ? splits
        : splits.map((split) => ({
          ...split,
          personalBest: {
            realtimeMS: split.endedAt.realtimeMS,
          },
        }));

      return {
        ...state,
        splits: newSplits,
      };
    }
    case 'UPDATE_SPLITS': {
      const { splits } = payload || {};

      return {
        ...state,
        splits,
      };
    }
    default:
      return state;
  }
};
