import React from 'react';
import { timeFormat } from '../../utils';

const Stopwatch = ({time}) => {
  return(
    <div className='stopwatch'>
      { timeFormat(time)}
    </div>
  )
}

export default Stopwatch
