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
      dayList: {},
    };

    this.filterTransactions = this.filterTransactions.bind(this);
  }

  componentWillMount() {
    this.setDayList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.transactions) !== JSON.stringify(this.props.transactions))
        this.setDayList()
  }

  setDayList() {
    const dayList = {};
    Object.values(this.props.transactions).forEach((t) => dayList[t.date] = null);
    this.setState({ dayList }, this.filterTransactions);
  }


  filterTransactions() {
    if (!Object.keys(this.props.transactions).length || !Object.keys(this.state.dayList).length)
      return null;

    let transactions = Object.values(this.props.transactions).reduce((memo, t) => {
      if (t.type === 'pay' && t.payerId === this.props.userId) {
          // I pay them ---> balance goes down
          t.amount = -Math.abs(t.amount);
      }
      if (t.type === 'req' && t.payeeId === this.props.userId){
          // I requested they pay me ---> balance goes down
          t.amount = -Math.abs(t.amount);
      }
      const id = t.payeeId === this.props.userId ? t.payerId : t.payeeId;
      const date = t.date;
      if (!memo[id]) 
        memo[id] = { ...this.state.dayList };
      if (!memo[id][date]) 
        memo[id][date] = [];
      memo[id][date].push(t);
      return memo;
    }, {});
    console.log(transactions);
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