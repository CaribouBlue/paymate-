import React from 'react';
import _ from 'lodash';
import {
  LineHeader,
  Payline,
} from './_index';

class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactionsById: {},
    };
  }

  componentWillMount() {
    this.filterTransactions()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.transactions) !== JSON.stringify(this.props.transactions) ||
      JSON.stringify(prevProps.dayList) !== JSON.stringify(this.props.dayList)
    )
        this.filterTransactions()
  }

  filterTransactions() {
    if (!Object.keys(this.props.transactions).length || !Object.keys(this.props.dayList).length)
      return null;

    let transactions = Object.values(this.props.transactions).reduce((memo, t) => {
      const id = t.payeeId === this.props.userId ? t.payerId : t.payeeId;
      const date = t.date;
      if (!memo[id]) 
        memo[id] = { ...this.props.dayList };
      if (!memo[id][date]) 
        memo[id][date] = [];
      memo[id][date].push(t);
      return memo;
    }, {});

    this.setState({ transactionsById: transactions });
  }

  render() {
    return (
      <div>
        {
          this.props.group.map(member => member.id === this.props.userId ? null :
            <div
              key={_.uniqueId()}
            >
              <LineHeader
                member={member}
                //balance={this.props.balances[member.id]}
              />
              <Payline
                member={member}
                transactions={this.state.transactionsById[member.id]}
              />
            </div>
          )
        }
      </div>
    );
  }
};

export default Dash;