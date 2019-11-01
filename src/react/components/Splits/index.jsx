import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  msToTime,
  getPBComparison,
  isBestDuration,
} from '../../utils';

class Splits extends React.PureComponent {
  render() {
    const { splits, currentSplit, isRunning } = this.props || {};
    return (
      <SplitsContainer>
        {
          splits.map((split, index) => {
            const {
              name,
              endedAt,
              personalBest,
            } = split || {};
            const { realtimeMS } = endedAt || {};

            const hasBestTime = personalBest.realtimeMS > 0 ? msToTime(personalBest.realtimeMS) : '-';
            const timeToRender = realtimeMS > 0 ? msToTime(realtimeMS) : hasBestTime;
            const comparison = getPBComparison(split);
            const renderComparison = comparison > 0 ? `+${msToTime(comparison)}` : `${msToTime(comparison)}`;

            return (
              <Split key={split.index} current={currentSplit === split.index}>
                <SplitName>
                  { name }
                </SplitName>
                <SplitComparison comparison={comparison} isGold={isBestDuration(splits, index)}>
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
background-color: ${(props) => (props.current ? 'rgba(255,255,255, 0.5)' : '')};
color: white;
display: flex;
flex-direction: row;
font-size: 1.15rem;
font-variant-numeric: tabular-nums lining-nums;
padding: 0.5rem 1rem;
text-shadow: 1px 1px 1px #333;
`;

const SplitName = styled.div`
`;

const SplitTimes = styled.div`
margin-left: 1rem;
`;

const SplitComparison = styled.div`
color: ${(props) => {
    const { isGold, comparison } = props;
    if (isGold) return 'yellow';

    return comparison > 0 ? 'red' : 'lime';
  }}
margin-left: auto;
text-shadow: 1px 1px 1px #333;
`;
