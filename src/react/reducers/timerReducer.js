import {
  SET_IS_PAUSED,
  SET_IS_RUNNING,
  SET_IS_COMPLETE,
  SHOW_CONTROLS,
  SET_SPLIT,
  START_RUN,
} from '../constants/timer';
import { getDuration, getBestComparisons } from '../utils';

const initialState = {
  isRunning: false,
  isPaused: false,
  isComplete: false,
  showControls: true,
  comparisons: [],
  splits: [
    {
      index: 0,
      name: 'Stasis',
      endedAt: {
        realtimeMS: 0,
      },
      bestDuration: {
        realtimeMS: 0,
      },
      personalBest: {
        realtimeMS: 0,
      },
    },
    {
      index: 1,
      name: 'Cryonis',
      endedAt: {
        realtimeMS: 0,
      },
      bestDuration: {
        realtimeMS: 0,
      },
      personalBest: {
        realtimeMS: 0,
      },
    },
  ],
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
      const { time, index } = payload || {};
      const { splits } = state || {};

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

    case 'UPDATE_BEST_DURATIONS': {
      const { splits } = state;

      const comparisons = getBestComparisons(splits);

      const newSplits = splits.map((split, index) => {
        const { bestDuration } = split || {};
        const { realtimeMS: currentBest } = bestDuration || {};

        return {
          ...split,
          bestDuration: {
            realtimeMS: (comparisons[index] < currentBest || currentBest === 0)
              ? getDuration(splits, index)
              : currentBest,
          },
        };
      });

      return {
        ...state,
        splits: newSplits,
      };
    }

    case 'SET_PERSONAL_BESTS': {
      const { splits } = state || {};
      const { time } = payload || {};

      const pbInMs = splits.map((split) => split.personalBest.realtimeMS)
        .reduce((a, b) => a + b, 0);

      if (time > pbInMs && pbInMs !== 0) return state;

      const newSplits = splits.map((split) => ({
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


    default:
      return state;
  }
};
