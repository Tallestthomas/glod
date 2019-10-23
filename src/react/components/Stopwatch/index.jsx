import React from 'react';
import styled from 'styled-components';
import { timeFormat } from '../../utils';

const Stopwatch = ({time}) => {
  return(
    <StopwatchContainer>
      { timeFormat(time)}
    </StopwatchContainer>
  )
}

export default Stopwatch

const StopwatchContainer = styled.div`
text-align: right;
padding: 1rem;
font-size: 2rem;
font-variant-numeric: tabular-nums lining-nums;
color: white;
`
