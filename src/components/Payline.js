import React from 'react';
import _ from 'lodash';
import { DayNode } from './_index';

class Payline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderDayNodes() {
    const nodes = [];
    let count = 1;
    for (let date in this.props.transactions) {
      nodes.push(
        <DayNode
          count={count}
          date={date}
          transactions={this.props.transactions[date]}
          key={_.uniqueId()}
        />
      );
      count++;
      if (count > 3) count = 1;
    }
    return nodes.reverse();
  }

  getPaylineClass() {
    if (this.props.last)
      return'last payline'; 
    else if (this.props.first)
      return 'first payline';
    else
      return 'middle payline';
  }

  render() {
    return (
      <div
        onScroll={this.props.scrollHandler}
        className={this.getPaylineClass()}
      >
        {this.renderDayNodes()}
      </div>
    );
  }
};

export default Payline;