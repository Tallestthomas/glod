import React from 'react';
import styled from 'styled-components';
import {
  openSplitFile,
  saveSplitFile,
  msToTime,
  timeToMs,
  history
} from '../../../utils'

class SplitsMenu extends React.Component {
  state = {
    splits: []
  }

  componentDidMount(){
    this.loadSplits();
  }

  loadSplits = () => {
    const { splits } = openSplitFile();
    this.setState({ splits });
  }

  editName = index => ( event ) => {
    const { splits } = this.state;

    const { target } = event;
    const { value } = target || {};

    const newSplit = {
      ...splits[index],
      name: value
    }

    this.setState({
      splits: [
        ...splits.slice(0, index),
        newSplit,
        ...splits.slice(index + 1)
      ]
    })
  }

  editTime = index => event => {
    const { splits } = this.state;

    const { target } = event;
    const { value, name } = target || {};

    const newSplit = {
      ...splits[index],
      [name]: {
        realtimeMS: timeToMs(value)
      }
    }

    this.setState({
      splits: [
        ...splits.slice(0, index),
        newSplit,
        ...splits.slice(index + 1)
      ]
    });
  }

  saveSplits = () => {
    const { splits } = this.state;
    saveSplitFile(splits);

    history.push('/');
  }

  render() {
    const { splits } = this.state;

    return(
      <SplitsMenuContainer>
        {splits.map(split => {
          const { 
            name,
            index,
            endedAt: {
              realtimeMS: endedAt, 
            },
            personalBest: {
              realtimeMS: personalBestTime
            },
            bestDuration: {
              realtimeMS: bestDuration
            }
          } = split || {};

          return (
            <SplitContainer key={index}>
              <InputContainer>
                Name: 
                <input defaultValue={name} name="name" onBlur={this.editName(index)} />
              </InputContainer>
              <InputContainer>
                Split Time: 
                <input 
                  defaultValue={msToTime(endedAt)} 
                  name="endedAt"
                  onBlur={this.editTime(index)}
                />
              </InputContainer>
              <InputContainer>
                Personal Best:
                <input 
                  defaultValue={msToTime(personalBestTime)} 
                  name="personalBest"
                  onBlur={this.editTime(index)}
                />
              </InputContainer>
              <InputContainer>
                Best Duration:
                <input 
                  defaultValue={msToTime(bestDuration)} 
                  name="bestDuration"
                  onBlur={this.editTime(index)}
                />
              </InputContainer>
            </SplitContainer>
          );
        })}
        <button onClick={() => history.push('/')}>Cancel</button>
        <button onClick={() => this.saveSplits()}>Save</button>
      </SplitsMenuContainer>
    );
  }
}

export default SplitsMenu;

const SplitsMenuContainer = styled.div`
background-color: black;
`;

const SplitContainer = styled.div`
border: 1px solid grey;
padding: 1rem;
margin-bottom: 0.5rem;
`;

const InputContainer = styled.label`
display: block;
color: white;
input {
margin: 0.5rem;
}
`;
