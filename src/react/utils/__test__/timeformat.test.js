import { msToTime, timeToMs } from '..';

describe('timeToMs', () => {
  it('should convert hours to ms', () => {
    const time = '1:00:00';
    const ms = timeToMs(time);
    expect(ms).toEqual(3600000);
  });

  it('should convert minutes to ms', () => {
    const time = '1:00';
    const ms = timeToMs(time);
    expect(ms).toEqual(60000);
  });

  it('should conver seconds to ms', () => {
    const time = '1';
    const ms = timeToMs(time);
    expect(ms).toEqual(1000);
  });

  it('should handle negative time', () => {
    const time = '-1.5';
    const ms = timeToMs(time);
    expect(ms).toEqual(-1500);
  });
});
