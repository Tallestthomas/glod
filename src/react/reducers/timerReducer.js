import {
  SET_IS_PAUSED,
  SET_IS_RUNNING,
  SET_IS_COMPLETE,
  SHOW_CONTROLS,
  SET_SPLIT,
  START_RUN,
} from '../constants/timer';
import { getDuration, comparison } from '../utils';

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
    },
    {
      index: 1,
      name: 'Stasis',
      endedAt: {
        realtimeMS: 0,
      },
      bestDuration: {
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
      const { splits, comparisons } = state || {};

      const { bestDuration } = splits[index] || {};
      const { realtimeMS: bestTime } = bestDuration || {};


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

      const newComparisons = [...comparisons, comparison(newSplits[index], bestTime)];

      return {
        ...state,
        comparisons: newComparisons,
        splits: newSplits,
      };
    }

    case START_RUN: {
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        isComplete: false,
        comparisons: [],
      };
    }

    case 'UPDATE_BEST_DURATIONS': {
      const { splits } = state;

      const newSplits = splits.map((split, index) => {
        const { endedAt, bestDuration } = split || {};
        const { realtimeMS: currentTime } = endedAt || {};
        const { realtimeMS: currentBest } = bestDuration || {};
        const prevTime = splits[index - 1] ? splits[index - 1].endedAt.realtimeMS : 0;

        const comparedTimes = comparison(split, prevTime);

        let best;
        if (currentBest === 0 || comparedTimes < 0) {
          best = getDuration(currentTime, prevTime);
        } else {
          best = currentBest;
        }

        return {
          ...split,
          bestDuration: {
            realtimeMS: best,
          },
        };
      });

      return {
        ...state,
        splits: newSplits,
      };
    }
    default:
      return state;
  }
};
