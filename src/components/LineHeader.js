import React from 'react';



class LineHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: '$0.00',
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
        balance += -Math.abs(t.amount);
      } else if (t.type === 'req' && t.payeeId === this.props.userId){
        // I requested they pay me ---> balance goes down
        balance += -Math.abs(t.amount);
      } else
        balance += t.amount;
    });
    if (balance < 0) balance = '-$' + Math.abs(balance).toFixed(2);
    else balance = '$' + balance.toFixed(2);
    this.setState({ balance });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1>{this.props.member.firstName}</h1>
        <h2>{this.state.balance}</h2>
      </div>
    );
  }
};

export default LineHeader;