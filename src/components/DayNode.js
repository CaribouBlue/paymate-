import React from 'react';
import _ from 'lodash';

const DayNode = props => (
  <div>
    <ul> {props.date}
      {
        props.transactions ? props.transactions.map(t => 
          <li
            key={_.uniqueId()}
          >
            {t.amount}
          </li>
        ) : null
      }
    </ul>
  </div>
);

export default DayNode;