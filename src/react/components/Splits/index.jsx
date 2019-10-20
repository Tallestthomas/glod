import React from 'react';

const data = {
  splits: [
    {
      id: '1',
      name: 'Stasis',
    },
    {
      id: '2',
      name: 'Cryonis',
    },
    {
      id: '3',
      name: 'Magnesis',
    },
    {
      id: '4',
      name: 'Bombs',
    },
    {
      id: '5',
      name: 'Paraglider',
    },
  ]
}

const Splits = () => {
  return (
    <div className="splits">
      {
        data.splits.map(split => (
          <div className="split">
            <div className="split-name">
              { split.name }
            </div>
            <div className="split-difference">
            </div>
            <div className="split-time">
              4:45
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Splits;
