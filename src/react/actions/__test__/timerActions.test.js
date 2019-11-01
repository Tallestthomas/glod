import * as actions from '../timerActions';
import * as constants from '../../constants/timer';

describe('timer actions', () => {
  it('should set is running', () => {
    const expectedResult = {
      type: constants.SET_IS_RUNNING,
      payload: {
        isRunning: true,
      },
    };
    const result = actions.setIsRunning(true);

    expect(result).toEqual(expectedResult);
  });

  it('should set isPaused', () => {
    const expectedResult = {
      type: constants.SET_IS_PAUSED,
      payload: {
        isPaused: true,
      },
    };
    const result = actions.setIsPaused(true);

    expect(result).toEqual(expectedResult);
  });

  it('should set isComplete', () => {
    const expectedResult = {
      type: constants.SET_IS_COMPLETE,
      payload: {
        isComplete: true,
      },
    };
    const result = actions.setIsComplete(true);

    expect(result).toEqual(expectedResult);
  });

  it('should handle showControls', () => {
    const expectedResult = {
      type: constants.SHOW_CONTROLS,
    };

    const result = actions.showControls();

    expect(result).toEqual(expectedResult);
  });
});
