import React from 'react';
import _ from 'lodash';

const DayNode = props => (
  <div>
    <ul> {props.date}
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