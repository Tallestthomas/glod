import React from 'react';
import styled from 'styled-components';
import { msToTime } from '../../utils';

const PersonalBest = ({ splits }) => {
  const personalBest = splits
    .map((split) => split.personalBest.realtimeMS)
    .reduce((a, b) => a + b, 0);

  return (
    <PersonalBestContainer>
      <PersonalBestTime>
        Personal Best:
        <PersonalBestDuration>
          {personalBest === 0 ? '-' : msToTime(personalBest)}
        </PersonalBestDuration>
      </PersonalBestTime>
    </PersonalBestContainer>
  );
};

export default PersonalBest;

const PersonalBestContainer = styled.div`
width: 100%;
`;


const PersonalBestTime = styled.div`
display: flex;
flex-direction: row;
padding: 0.5rem 1rem 0 1rem;
font-variant-numeric: tabular-nums lining-nums;
`;

const PersonalBestDuration = styled.div`
margin-left: auto;
`;
