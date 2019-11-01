import React from 'react';
import styled from 'styled-components';
import { msToTime } from '../../utils';

const Stopwatch = ({ time }) => (
  <StopwatchContainer>
    {msToTime(time)}
  </StopwatchContainer>
);

export default Stopwatch;

const StopwatchContainer = styled.div`
text-align: right;
padding: 1rem;
font-size: 2rem;
font-weight: bold;
font-variant-numeric: tabular-nums lining-nums;
color: white;
text-shadow: 1px 1px 1px #000;
`;
