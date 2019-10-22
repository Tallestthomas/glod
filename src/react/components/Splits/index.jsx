import React from 'react';
import { connect } from 'react-redux';
import { timeFormat } from '../../utils';

class Splits extends React.PureComponent {
  render(){
    const { splits } = this.props || {};
    return (
      <div className="splits">
        {
          splits.map(split => {
            const { name, time } = split || {};
            const timeToRender = (time === null || time === 0) ? '-' : timeFormat(time);
            return(
              <div className="split" key={split.index}>
                <span className="split-name">
                  { name }
                </span>
                <span>
                  {timeToRender}
                </span>
              </div>
            )
          })
        }
      </div>
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
