import {
  START_TIMER,
  STOP_TIMER
} from '../constants/timer';
const initialState = {
  isRunning: false,
  splits: [
    {
      index: 0,
      name: 'Stasis',
      time: null,
      best: null
    },
    {
      index: 1,
      name: 'Cryonis',
      time: null,
      best: null
    },
    {
      index: 2,
      name: 'Magnesis',
      time: null,
      best: null
    },
    {
      index: 3,
      name: 'Bombs',
      time: null,
      best: null
    },
  ]
}

export default (state = initialState, {type, payload}) => {
  switch(type) {
    case START_TIMER:{
      return {
        ...state,
        isRunning: true,
      }
    }
    case STOP_TIMER: {
      return {
        ...state,
        isRunning: false
      }
    }
    case 'SET_SPLIT': {

      const newSplits = state.splits.map(split => { 
        return split.index === payload.index
          ? { ...split, time: payload.time }
          : split
      });

      return {
        ...state,
        splits: newSplits
      }
    }
    default: 
      return state
  }
}
