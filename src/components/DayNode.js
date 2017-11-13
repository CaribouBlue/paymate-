import React from 'react';
import _ from 'lodash';
import { numToCash } from '../lib/helpers';

class DayNode extends React.Component {
  getListItems() {
    if (this.props.transactions) {
      return this.props.transactions
        .sort((a, b) => b.amount - a.amount)
        .map((t, i) => 
          <li
            key={_.uniqueId()}
            className={t.payout ? 'out' : 'in'}
            style={{
              width: (30 + 1.5 * (this.props.transactions.length - i)) + '%',
            }}
          >
            {numToCash(t.amount, true)}
          </li>
        );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        className="day-node"
      >
        <h3>{this.props.date}</h3>
        <ul>
          { this.getListItems() }
        </ul>
      </div>
    );
  }
};

export default DayNode;