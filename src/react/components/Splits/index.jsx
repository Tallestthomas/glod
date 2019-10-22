import React from 'react';
import { connect } from 'react-redux';
import { timeFormat } from '../../utils';
import styled from 'styled-components';

class Splits extends React.PureComponent {
  render(){
    const { splits } = this.props || {};
    return (
      <SplitsContainer>
        {
          splits.map(split => {
            const { name, time } = split || {};
            const timeToRender = (time === null || time === 0) ? '-' : timeFormat(time);
            return(
              <Split key={split.index}>
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
display: flex;
flex-direction: row;
padding: 0.5rem 1rem;
`

const SplitName = styled.div`
`

const SplitTimes = styled.div`
margin-left: auto;
`
