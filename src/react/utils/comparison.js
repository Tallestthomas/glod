export const getDuration = (splitTime, prevTime) => splitTime - prevTime;

export const comparison = (split, prevTime = 0) => {
  const { endedAt, bestDuration } = split || {};
  const { realtimeMS: currentTime } = endedAt || {};
  const { realtimeMS: bestTime } = bestDuration || {};
  const currentDuration = getDuration(currentTime, prevTime);

  return currentDuration - bestTime;
};
