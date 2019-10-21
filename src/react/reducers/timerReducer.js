import {
  START_TIMER,
  STOP_TIMER
} from '../constants/timer';
const initialState = {
  isRunning: false,
  splits: [
    {
      id: '1',
      name: 'Stasis',
      time: null,
      best: null
    },
    {
      id: '2',
      name: 'Cryonis',
      time: null,
      best: null
    },
    {
      id: '3',
      name: 'Magnesis',
      time: null,
      best: null
    },
    {
      id: '4',
      name: 'Bombs',
      time: null,
      best: null
    },
    {
      id: '5',
      name: 'Paraglider',
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
        console.log(split.id, payload.id);
        return split.id === payload.id
          ? { ...split, time: payload.time }
          : split
      }
      );

      console.log(newSplits);

      return {
        ...state,
        splits: newSplits
      }
    }
    default: 
      return state
  }
}
