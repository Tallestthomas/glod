import reducer from '../timerReducer';
import * as constants from '../../constants/timer';


describe('Timer Reducer', () => {
  it('should return default state', () => {
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

    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should start timer', () => {
    const initialState = {
      isRunning: false,
    };

    expect(reducer(initialState, {
      type: constants.SET_IS_RUNNING,
      payload: {
        isRunning: true,
      },
    }))
      .toEqual({
        isRunning: true,
      });
  });

  it('should stop timer', () => {
    const initialState = {
      isRunning: true,
    };

    expect(reducer(initialState, {
      type: constants.SET_IS_RUNNING,
      payload: {
        isRunning: false,
      },
    }))
      .toEqual({
        isRunning: false,
      });
  });

  it('should set split time', () => {
    const action = {
      type: 'SET_SPLIT',
      payload: {
        index: 0,
        newSplits: [
          {
            index: 0,
            name: 'Stasis',
            endedAt: {
              realtimeMS: 2,
            },
          },
        ],
      },
    };

    const initialState = {
      splits: [
        {
          index: 0,
          name: 'Stasis',
          endedAt: {
            realtimeMS: 0,
          },
        },
      ],
    };

    const expectedState = {
      splits: [
        {
          index: 0,
          name: 'Stasis',
          endedAt: {
            realtimeMS: 2,
          },
        },
      ],
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
