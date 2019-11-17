import React from 'react';
import { desktopCapturer } from 'electron';
import { connect } from 'react-redux';
import Rembrandt from 'rembrandt/build/browser';

class TestVideoStuff extends React.Component {
  state = {
    source: '',
    isRunning: false,
  }

  componentDidMount() {
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async (sources) => {
      const source = sources.find((element) => element.name.includes('Users'));
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
            },
          },
          frameRate: 60,
          resizeMode: 'crop-and-scale',
        });

        this.handleVideo(stream);
      } catch (err) {
        this.handleError(err);
      }
    });
  }

  componentDidUpdate() {
    console.log('updated');
  }

  handleVideo = (stream) => {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
  }

  handleError = (err) => {
    console.log(err);
  }

  isPlaying = () => {
    const { start, split } = this.props;
    const video = document.querySelector('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const comparisonCanvas = document.createElement('canvas');
    const compCtx = comparisonCanvas.getContext('2d');

    compCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, comparisonCanvas.width, comparisonCanvas.height);
    const imageData = comparisonCanvas.toDataURL();

    setInterval(async () => {
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
      const currentData = canvas.toDataURL();
      const rembrandt = new Rembrandt({
        imageA: imageData,
        imageB: currentData,

        // Needs to be one of Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS
        thresholdType: Rembrandt.THRESHOLD_PERCENT,

        // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
        maxThreshold: 0.01,

        // Maximum color delta (0...255):
        maxDelta: 0.2,

        // Maximum surrounding pixel offset
        maxOffset: 0,
      });

      const result = await rembrandt.compare();
      if (result.passed) {
        if (this.state.isRunning) {
          split();
        } else {
          start();
          this.setState({ isRunning: true });
        }
      }
    }, 1000 / 30);
  }

  render() {
    return (
      <>
        <video
          id="video"
          src={this.state.source}
          style={{ position: 'fixed', right: '-10000px' }}
          onPlaying={this.isPlaying}
        />
      </>
    );
  }
}

const mapStateToProps = ({ timerReducer }) => {
  const {
    isRunning,
  } = timerReducer || {};
  return {
    isRunning,
  };
};

export default connect(mapStateToProps)(TestVideoStuff);
