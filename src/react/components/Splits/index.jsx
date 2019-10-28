import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { msToTime, getPBComparison, getDuration } from '../../utils';

class Splits extends React.PureComponent {
  render() {
    const { splits, currentSplit, isRunning } = this.props || {};
    return (
      <SplitsContainer>
        {
          splits.map((split, index) => {
            const {
              name, endedAt, personalBest, bestDuration,
            } = split || {};
            const { realtimeMS } = endedAt || {};
            const { realtimeMS: bestTime } = bestDuration || {};
            const hasBestTime = personalBest.realtimeMS > 0 ? msToTime(personalBest.realtimeMS) : '-';
            const timeToRender = realtimeMS > 0 ? msToTime(realtimeMS) : hasBestTime;
            const comparison = getPBComparison(split);
            const renderComparison = comparison > 0 ? `+${msToTime(comparison)}` : `${msToTime(comparison)}`;
            const splitDuration = getDuration(splits, index);
            const isGold = bestTime > splitDuration;

            return (
              <Split key={split.index} current={currentSplit === split.index}>
                <SplitName>
                  { name }
                </SplitName>
                <SplitComparison comparison={comparison} isGold={isGold}>
                  {(realtimeMS !== 0 && comparison !== realtimeMS && isRunning) ? renderComparison : ''}
                </SplitComparison>
                <SplitTimes>
                  {timeToRender}
                </SplitTimes>
              </Split>
            );
          })
        }
      </SplitsContainer>
    );
  }
}

const mapStateToProps = ({ timerReducer }) => {
  const { splits, comparisons, isRunning } = timerReducer;
  return {
    isRunning,
    splits,
    comparisons,
  };
};

export default connect(mapStateToProps)(Splits);

const SplitsContainer = styled.div`
width: 100%;
`;

const Split = styled.div`
background-color: ${(props) => (props.current ? 'rgba(255,255,255, 0.2)' : '')};
color: black;
display: flex;
flex-direction: row;
padding: 0.5rem 1rem;
font-variant-numeric: tabular-nums lining-nums;
`;

const SplitName = styled.div`
`;

const SplitTimes = styled.div`
margin-left: 1rem;
`;

const SplitComparison = styled.div`
color: ${(props) => {
    const { isGold, comparison } = props;
    if (isGold) return 'gold';

    return comparison > 0 ? 'red' : 'green';
  }}
margin-left: auto;
`;
