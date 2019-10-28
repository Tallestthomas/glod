import React from 'react';
import styled from 'styled-components';
import { msToTime } from '../../utils';

const SumOfBest = ({ splits }) => {
  const sumOfBest = splits
    .map((split) => split.bestDuration.realtimeMS)
    .reduce((a, b) => a + b, 0);

  return (
    <SumOfBestContainer>
      <SumOfBestTime>
        Sum of Best:
        <SumOfBestDuration>
          { sumOfBest === 0 ? '-' : msToTime(sumOfBest) }
        </SumOfBestDuration>
      </SumOfBestTime>
    </SumOfBestContainer>
  );
};

export default SumOfBest;

const SumOfBestContainer = styled.div`
width: 100%;
`;


const SumOfBestTime = styled.div`
display: flex;
flex-direction: row;
padding: 0.5rem 1rem 0 1rem;
font-variant-numeric: tabular-nums lining-nums;
`;

const SumOfBestDuration = styled.div`
margin-left: auto;
`;
