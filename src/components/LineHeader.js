import React from 'react';



class LineHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
    };
  }

  componentDidMount() {
    this.calculateBalance();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.transactions) !== JSON.stringify(this.props.transactions))
        this.calculateBalance()
  }

  calculateBalance() {
    let ledger = [];
    let balance = 0;
    for (let date in this.props.transactions) {
      if (this.props.transactions[date])
        ledger = [ ...ledger, ...this.props.transactions[date]];
    }
    ledger.forEach(t => {
      if (t.type === 'pay' && t.payerId === this.props.userId) {
        // I pay them ---> balance goes down
        t.amount = -Math.abs(t.amount);
      }
      if (t.type === 'req' && t.payeeId === this.props.userId){
        // I requested they pay me ---> balance goes down
        t.amount = -Math.abs(t.amount);
      }
      balance += t.amount;
    });
    if (balance < 0) balance = '-$' + Math.abs(balance.toFixed(2));
    else balance = '$' + balance;
    this.setState({ balance });

  }

  render() {
    return (
      <div>
        {`${this.props.member.firstName}: ${this.state.balance}`}
      </div>
    );
  }
};

export default LineHeader;