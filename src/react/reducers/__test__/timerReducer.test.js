import reducer from '../timerReducer';
import {
  START_TIMER,
  STOP_TIMER
} from '../../constants/timer';


describe('Timer Reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual({
      isRunning: false,
      splits: [
        {
          index: 0,
          name: 'Stasis',
          time: null,
          best: null,
        }
      ]
    });
  });

  it('should start timer', () => {
    const initialState = {
      isRunning: false
    };

    expect(reducer(initialState, { type: START_TIMER}))
      .toEqual({
        isRunning: true,
      });
  });

  it('should stop timer', () => {
    const initialState = {
      isRunning: true
    };

    expect(reducer(initialState, { type: STOP_TIMER}))
      .toEqual({
        isRunning: false,
      });
  });

  it('should set split time' , () => {
    const action = {
      type: 'SET_SPLIT',
      payload: {
        index: 0,
        time: 2
      }
    };

    const initialState = {
      splits: [
        {
          index: 0,
          name: 'Stasis',
          time: null,
          best: null,
        },
        {
          index: 1,
          name: 'magnesis',
          time: null,
          best: null,
        }

      ]
    }

    expect(reducer(initialState, action)).toEqual({
      splits: [
        {
          index: 0,
          name: 'Stasis',
          time: 2,
          best: null,
        },
        {
          index: 1,
          name: 'magnesis',
          time: null,
          best: null,
        }
      ]
    });
  })
});
