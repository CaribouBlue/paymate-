import React from 'react';
import { ActionBarView as View } from './_index';
import { newTrasactions } from '../redux/actions/transactions';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actionType: 'none',
    };

    this.setActionType = this.setActionType.bind(this);
    this.submitAction = this.submitAction.bind(this);
  }

  setActionType(e, actionType = 'none') {
    if (e) e.preventDefault();
    this.setState({ actionType });
  }

  submitAction(type, amount, date, members) {
    const action = { type, amount, date };
    action.payeeIds = type === 'pay' ? members : [this.props.userId];
    action.payerIds = type === 'pay' ? [this.props.userId] : members;
    newTrasactions(action);
  }

  render() {
    return <View 
      { ...this.state }
      submitAction={this.submitAction}
      setActionType={this.setActionType} 
      group={this.props.group} 
      userId={this.props.userId}
    />;
  }
};

export default ActionBar;