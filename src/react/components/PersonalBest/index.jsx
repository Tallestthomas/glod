import React from 'react';
import styled from 'styled-components';
import { msToTime } from '../../utils';

const PersonalBestComponent = ({ splits }) => {
  const personalBest = splits[splits.length - 1].personalBest.realtimeMS;

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

const PersonalBest = React.memo(PersonalBestComponent);

export default PersonalBest;

const PersonalBestContainer = styled.div`
width: 100%;
`;


const PersonalBestTime = styled.div`
display: flex;
flex-direction: row;
padding: 0.5rem 1rem 0 1rem;
color: white;
text-shadow: 1px 1px 1px #444;
font-variant-numeric: tabular-nums lining-nums;
`;

const PersonalBestDuration = styled.div`
margin-left: auto;
`;
