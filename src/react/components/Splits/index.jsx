import React from 'react';


const Splits = ({splits = []}) => {
  return (
    <div className="splits">
      {
        splits.map(split =>{ 
          return(
          <div className="split" key={split.index}>
            <span className="split-name">
              { split.name }
          { split.time }
        </span>
      </div>
          )
        })
      }
    </div>
  );
};

export default Splits;
