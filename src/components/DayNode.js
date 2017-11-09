import React from 'react';
import _ from 'lodash';

const DayNode = props => (
  <div
    className="day-node"
  >
    <h3>{props.date}</h3>
    <ul>
      {
        props.transactions ? props.transactions.map(t => 
          <li
            key={_.uniqueId()}
            style={{
              color: t.payout ? 'red' : 'green',
            }}
          >
            {t.amount}
          </li>
        ) : null
      }
    </ul>
  </div>
);

export default DayNode;