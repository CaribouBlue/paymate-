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
    for (let date in this.props.transactions) {
      nodes.push(
        <DayNode
          date={date}
          transactions={this.props.transactions[date]}
          key={_.uniqueId()}
        />
      );
    }
    return nodes;
  }

  render() {
    return (
      <div
        onScroll={this.props.scrollHandler}
        className="pay-line"
      >
        {this.renderDayNodes()}
      </div>
    );
  }
};

export default Payline;