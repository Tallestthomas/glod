import {
  START_TIMER,
  STOP_TIMER,
  SHOW_CONTROLS
} from '../constants/timer';
const initialState = {
  isRunning: false,
  showControls: true,
  splits: [
    {
      index: 0,
      name: 'Stasis',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 1,
      name: 'Cryonis',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 2,
      name: 'Magnesis',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 3,
      name: 'Bombs',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 4,
      name: 'Glider',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 5,
      name: 'Castle',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 6,
      name: 'Blights',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 7,
      name: 'Calamity',
      time: null,
      best: null,
      pb: null
    },
    {
      index: 8,
      name: 'Dark Beast',
      time: null,
      best: null,
      pb: null
    }
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
    case SHOW_CONTROLS: {
      return {
        ...state,
        showControls: !state.showControls
      }
    }
    default: 
      return state
  }
}
