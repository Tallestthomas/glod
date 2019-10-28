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
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 298592, gametimeMS: 0 },
      bestDuration: { realtimeMS: 161093, gametimeMS: 0 },
    },
    {
      index: 1,
      name: 'Cryonis',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 536978, gametimeMS: 0 },
      bestDuration: { realtimeMS: 212948, gametimeMS: 0 },
    },
    {
      index: 2,
      name: 'Magnesis',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 717398, gametimeMS: 0 },
      bestDuration: { realtimeMS: 156688, gametimeMS: 0 },
    },
    {
      index: 3,
      name: 'Bombs',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 954767, gametimeMS: 0 },
      bestDuration: { realtimeMS: 191630, gametimeMS: 0 },
    },
    {
      index: 4,
      name: 'WOOOOOOOSH',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 1114644, gametimeMS: 0 },
      bestDuration: { realtimeMS: 132506, gametimeMS: 0 },
    },
    {
      index: 5,
      name: 'Castle',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 1764366, gametimeMS: 0 },
      bestDuration: { realtimeMS: 468161, gametimeMS: 0 },
    },
    {
      index: 6,
      name: 'Blights',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 2036294, gametimeMS: 0 },
      bestDuration: { realtimeMS: 264464, gametimeMS: 0 },
    },
    {
      index: 7,
      name: 'Calamity',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 2243472, gametimeMS: 0 },
      bestDuration: { realtimeMS: 186625, gametimeMS: 0 },
    },
    {
      index: 8,
      name: 'BIGGY PIGGY',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 2416311, gametimeMS: 0 },
      bestDuration: { realtimeMS: 168125, gametimeMS: 0 },
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

    case UPDATE_BEST_DURATIONS: {
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

    case SET_PERSONAL_BESTS: {
      const { splits } = state || {};
      const { time } = payload || {};

      const pbInMs = splits[splits.lekgth - 1].personalBest.realtimeMS;

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
    default:
      return state;
  }
};
