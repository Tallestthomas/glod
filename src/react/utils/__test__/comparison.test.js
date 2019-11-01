import {
  getDuration,
  isBestDuration,
  getPBComparison,
} from '..';

describe('getDuration', () => {
  it('should return 1000', () => {
    const splits = [
      {
        endedAt: {
          realtimeMS: 2000,
        },
      },
      {
        endedAt: {
          realtimeMS: 3000,
        },
      },
    ];

    expect(getDuration(splits, 1)).toEqual(1000);
  });
});

describe('isBestDuration', () => {
  it('should return true', () => {
    const splits = [
      {
        endedAt: {
          realtimeMS: 2000,
        },
        bestDuration: {
          realtimeMS: 2200,
        },
      },
      {
        endedAt: {
          realtimeMS: 3000,
        },
        bestDuration: {
          realtimeMS: 1200,
        },
      },
    ];

    expect(isBestDuration(splits, 0)).toBeTruthy();
    expect(isBestDuration(splits, 1)).toBeTruthy();
  });

  it('should return true, false', () => {
    const splits = [
      {
        endedAt: {
          realtimeMS: 2000,
        },
        bestDuration: {
          realtimeMS: 2200,
        },
      },
      {
        endedAt: {
          realtimeMS: 4000,
        },
        bestDuration: {
          realtimeMS: 1200,
        },
      },
    ];

    expect(isBestDuration(splits, 0)).toBeTruthy();
    expect(isBestDuration(splits, 1)).toBeFalsy();
  });

  it('should return false, true', () => {
    const splits = [
      {
        endedAt: {
          realtimeMS: 3000,
        },
        bestDuration: {
          realtimeMS: 2200,
        },
      },
      {
        endedAt: {
          realtimeMS: 4000,
        },
        bestDuration: {
          realtimeMS: 1200,
        },
      },
    ];

    expect(isBestDuration(splits, 0)).toBeFalsy();
    expect(isBestDuration(splits, 1)).toBeTruthy();
  });

  it('should return false, false', () => {
    const splits = [
      {
        endedAt: {
          realtimeMS: 2300,
        },
        bestDuration: {
          realtimeMS: 2200,
        },
      },
      {
        endedAt: {
          realtimeMS: 4000,
        },
        bestDuration: {
          realtimeMS: 1200,
        },
      },
    ];

    expect(isBestDuration(splits, 0)).toBeFalsy();
    expect(isBestDuration(splits, 1)).toBeFalsy();
  });
});

describe('getPBComparisons', () => {
  const split = {
    endedAt: {
      realtimeMS: 2000,
    },
    personalBest: {
      realtimeMS: 2200,
    },
  };

  const comparison = getPBComparison(split);

  it('should return -200', () => {
    expect(comparison).toEqual(-200);
  });
});
