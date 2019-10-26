import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { msToTime } from '../../utils';

class Splits extends React.PureComponent {
  componentDidUpdate() {
    const { splits, comparisons } = this.props;

    console.log(splits, comparisons);
  }

  render() {
    const { splits, currentSplit, comparisons } = this.props || {};
    return (
      <SplitsContainer>
        {
          splits.map((split, index) => {
            const { name, endedAt, bestDuration } = split || {};
            const { realtimeMS } = endedAt || {};
            const hasBestTime = bestDuration.realtimeMS > 0 ? msToTime(bestDuration.realtimeMS) : '-';
            const timeToRender = realtimeMS > 0 ? msToTime(realtimeMS) : hasBestTime;

            return (
              <Split key={split.index} current={currentSplit === split.index}>
                <SplitName>
                  { name }
                </SplitName>
                <div>
                  {(realtimeMS !== 0 && comparisons[index]) ? msToTime(comparisons[index]) : ''}
                </div>
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
color: white;
display: flex;
flex-direction: row;
padding: 0.5rem 1rem;
font-variant-numeric: tabular-nums lining-nums;
`;

const SplitName = styled.div`
`;

const SplitTimes = styled.div`
margin-left: auto;
`;
