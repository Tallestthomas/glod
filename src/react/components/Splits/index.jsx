import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { msToTime, getPBComparison } from '../../utils';

class Splits extends React.PureComponent {
  render() {
    const { splits, currentSplit } = this.props || {};
    return (
      <SplitsContainer>
        {
          splits.map((split) => {
            const { name, endedAt, personalBest } = split || {};
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
                <SplitComparison comparison={comparison}>
                  {realtimeMS !== 0 && comparison !== realtimeMS ? renderComparison : ''}
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
  const { splits, comparisons } = timerReducer;
  return {
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
color: ${(props) => (props.comparison <= 0 ? 'green' : 'red')};
margin-left: auto;
`;
