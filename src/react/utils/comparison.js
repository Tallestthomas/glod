export const getDuration = (splits, index) => {
  const {
    endedAt: {
      realtimeMS: currentTime,
    },
  } = splits[index] || {};

  if (index === 0) return currentTime;

  const {
    endedAt: {
      realtimeMS: prevTime,
    },
  } = splits[index - 1] || {};

  return Math.abs(currentTime - prevTime);
};

export const isBestDuration = (splits, index) => {
  const currentDuration = getDuration(splits, index);


  const {
    bestDuration: {
      realtimeMS: currentBest,
    },
  } = splits[index];

  if (currentBest === 0) return true;

  return currentDuration <= currentBest;
};

export const getPBComparison = (split) => {
  const {
    endedAt: {
      realtimeMS: currentTime,
    },
    personalBest: {
      realtimeMS: personalBestTime,
    },
  } = split || {};

  return currentTime - personalBestTime;
};
