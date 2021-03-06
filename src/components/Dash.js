import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
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
    this.paylineScrollHandler = this.paylineScrollHandler.bind(this);
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
          // I pay them
          t.payout = true;
      } else if (t.type === 'req' && t.payeeId !== this.props.userId){
          // They requested I pay them
          t.payout = true;
      } else {
        // Them pay me OR I request they pay me
        t.payout = false;
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
    
    this.setState({ transactionsById: transactions });
  }

  paylineScrollHandler(e) {
    e.preventDefault();
    $('.payline, .last-payline, .first-payline').scrollLeft(e.target.scrollLeft);
  }

  render() {
    return (
      <div
        id="dash"
      >
        <div
          id="dash-header"
        >
        </div>
        {
          this.props.group.map((member, i) => member.id === this.props.userId ? null :
            <div
              className="dash-row"
              key={_.uniqueId()}
            >
              <LineHeader
                member={member}
                transactions={this.state.transactionsById[member.id]}
                userId={this.props.userId}
              />
              <Payline
                member={member}
                transactions={this.state.transactionsById[member.id]}
                scrollHandler={this.paylineScrollHandler}
                last={i === this.props.group.length - 1}
                first={i === 0}
              />
            </div>
          )
        }
        <div
          id="dash-footer"
        >
        </div>
      </div>
    );
  }
};

export default Dash;