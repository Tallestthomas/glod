import React from 'react';
import { connect } from 'react-redux';
import { timeFormat } from '../../utils';
import styled from 'styled-components';

class Splits extends React.PureComponent {
  render(){
    const { splits, currentTimes, currentSplit } = this.props || {};
    return (
      <SplitsContainer>
        {
          splits.map((split, index) => {
            const { name } = split || {};
            const timeToRender = ( !currentTimes[index] || currentTimes[index] === 0) ? '-' : timeFormat(currentTimes[index]);
            return(
              <Split key={split.index} current={currentSplit === split.index}>
                <SplitName>
                  { name }
                </SplitName>
                <SplitTimes>
                  {timeToRender}
                </SplitTimes>
              </Split>
            )
          })
        }
      </SplitsContainer>
    );
  }
}

const mapStateToProps = ({timerReducer}) => {
  const { splits } = timerReducer;
  return {
    splits
  }
}

export default connect(mapStateToProps)(Splits);

const SplitsContainer = styled.div`
width: 100%;
`

const Split = styled.div`
background-color: ${props => props.current ? 'rgba(255,255,255, 0.2)': ''};
color: white;
display: flex;
flex-direction: row;
padding: 0.5rem 1rem;
font-variant-numeric: tabular-nums lining-nums;
`

const SplitName = styled.div`
`

const SplitTimes = styled.div`
margin-left: auto;
`
