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
      personalBest: { realtimeMS: 306280, gametimeMS: 0 },
      bestDuration: { realtimeMS: 298592, gametimeMS: 0 },
    },
    {
      index: 1,
      name: 'Cryonis',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 589430, gametimeMS: 0 },
      bestDuration: { realtimeMS: 283150, gametimeMS: 0 },
    },
    {
      index: 2,
      name: 'Magnesis',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 860660, gametimeMS: 0 },
      bestDuration: { realtimeMS: 127968, gametimeMS: 0 },
    },
    {
      index: 3,
      name: 'Bombs',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 1130890, gametimeMS: 0 },
      bestDuration: { realtimeMS: 94107, gametimeMS: 0 },
    },
    {
      index: 4,
      name: 'WOOOOOOOSH',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 1308770, gametimeMS: 0 },
      bestDuration: { realtimeMS: 177880, gametimeMS: 0 },
    },
    {
      index: 5,
      name: 'Castle',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 1761430, gametimeMS: 0 },
      bestDuration: { realtimeMS: 452659, gametimeMS: 0 },
    },
    {
      index: 6,
      name: 'Blights',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 2021030, gametimeMS: 0 },
      bestDuration: { realtimeMS: 259600, gametimeMS: 0 },
    },
    {
      index: 7,
      name: 'Calamity',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 2212370, gametimeMS: 0 },
      bestDuration: { realtimeMS: 186625, gametimeMS: 0 },
    },
    {
      index: 8,
      name: 'BIGGY PIGGY',
      endedAt: { realtimeMS: 0 },
      personalBest: { realtimeMS: 2385770, gametimeMS: 0 },
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
