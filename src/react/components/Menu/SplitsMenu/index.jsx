import React from 'react';
import styled from 'styled-components';
import Button from '../../../styles/Button';
import {
  openSplitFile,
  saveSplitFile,
  msToTime,
  timeToMs,
  history,
} from '../../../utils';

const { remote, ipcRenderer } = window.require('electron');

class SplitsMenu extends React.Component {
  state = {
    splits: [],
  }

  componentDidMount() {
    this.loadSplits();
  }

  loadSplits = () => {
    const { splits } = openSplitFile();
    this.setState({ splits });
  }

  editName = (index) => (event) => {
    const { splits } = this.state;

    const { target } = event;
    const { value } = target || {};

    const newSplit = {
      ...splits[index],
      name: value,
    };

    this.setState({
      splits: [
        ...splits.slice(0, index),
        newSplit,
        ...splits.slice(index + 1),
      ],
    });
  }

  editTime = (index) => (event) => {
    const { splits } = this.state;

    const { target } = event;
    const { value, name } = target || {};

    const newSplit = {
      ...splits[index],
      [name]: {
        realtimeMS: timeToMs(value),
      },
    };

    this.setState({
      splits: [
        ...splits.slice(0, index),
        newSplit,
        ...splits.slice(index + 1),
      ],
    });
  }

  removeSegment = (index) => {
    const { splits } = this.state;

    const newSplits = splits.filter((_, splitIndex) => splitIndex !== index);

    this.setState({ splits: newSplits });
  }

  addSegmentAbove = (index) => {
    const { splits } = this.state;

    const newSplit = {
      name: '',
      endedAt: {
        realtimeMS: 0,
      },
      bestDuration: {
        realtimeMS: 0,
      },
      personalBest: {
        realtimeMS: 0,
      },
    };

    const newSplits = [
      ...splits.slice(0, index),
      newSplit,
      ...splits.slice(index),
    ];

    this.setState({ splits: newSplits });
  }

  addSegmentBelow = (index) => {
    const { splits } = this.state;

    const newSplit = {
      name: '',
      endedAt: {
        realtimeMS: 0,
      },
      bestDuration: {
        realtimeMS: 0,
      },
      personalBest: {
        realtimeMS: 0,
      },
    };

    const newSplits = [
      ...splits.slice(0, index + 1),
      newSplit,
      ...splits.slice(index + 1),
    ];

    this.setState({ splits: newSplits });
  }

  moveSegmentUp = (index) => {
    const { splits } = this.state;
    const segment = splits[index];

    const filteredSplits = splits.filter((_, splitIndex) => splitIndex !== index);

    const newSplits = [
      ...filteredSplits.slice(0, index - 1),
      segment,
      ...filteredSplits.slice(index - 1),
    ];

    this.setState({ splits: newSplits });
  }

  moveSegmentDown = (index) => {
    const { splits } = this.state;
    const segment = splits[index];

    const filteredSplits = splits.filter((_, splitIndex) => splitIndex !== index);

    const newSplits = [
      ...filteredSplits.slice(0, index + 1),
      segment,
      ...filteredSplits.slice(index + 1),
    ];

    this.setState({ splits: newSplits });
  }

  saveSplits = () => {
    const { splits } = this.state;
    saveSplitFile(splits);
    const win = remote.getCurrentWindow();
    win.close();
  }

  render() {
    const { splits } = this.state;

    return (
      <SplitsMenuContainer>
        {splits.map((split, index) => {
          const {
            name,
            endedAt: {
              realtimeMS: endedAt,
            },
            personalBest: {
              realtimeMS: personalBestTime,
            },
            bestDuration: {
              realtimeMS: bestDuration,
            },
          } = split || {};

          return (
            <SplitContainer key={name}>
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
              <SplitControlsContainer>
                <Button type="button" onClick={() => this.removeSegment(index)}>Remove</Button>
                <Button type="button" onClick={() => this.moveSegmentUp(index)}>Move Up</Button>
                <Button type="button" onClick={() => this.moveSegmentDown(index)}>Move Down</Button>
                <Button type="button" onClick={() => this.addSegmentAbove(index)}>Insert Above</Button>
                <Button type="button" onClick={() => this.addSegmentBelow(index)}>Insert Below</Button>
              </SplitControlsContainer>
            </SplitContainer>
          );
        })}
        <Button
          onClick={() => {
            ipcRenderer.send('close-menu');
          }}
          type="button"
        >
Cancel
        </Button>
        <Button onClick={() => this.saveSplits()} type="button">Save</Button>
      </SplitsMenuContainer>
    );
  }
}

export default SplitsMenu;

const SplitsMenuContainer = styled.div`
background: inherit;
`;

const SplitContainer = styled.div`
border: 1px solid grey;
padding: 1rem;
margin-bottom: 0.5rem;
`;

const InputContainer = styled.label`
display: flex;
justify-content: space-between;
align-items: center;
color: white;
input {
margin: 0.5rem;
width: 50%;
}
`;

const SplitControlsContainer = styled.div`
display: flex;
justify-content: space-between;
`;
