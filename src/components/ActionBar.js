import React from 'react';
import { ActionForm } from './_index';
import { newTrasactions } from '../redux/actions/transactions';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeSelected: false,
      actionType: 'none',
    };

    this.selectActionType = this.selectActionType.bind(this);
    this.submitAction = this.submitAction.bind(this);
  }

  selectActionType(e, actionType) {
    if (e) e.preventDefault();
    let typeSelected = true;
    if (!actionType) {
      typeSelected = false;
      actionType = 'none';
    }
    this.setState({
      typeSelected,
      actionType,
    });
  }

  submitAction(type, amount, date, members) {
    const action = { type, amount, date };
    action.payeeIds = type === 'pay' ? members : [this.props.userId];
    action.payerIds = type === 'pay' ? [this.props.userId] : members;
    newTrasactions(action);
  }

  renderBar() {
    if (this.state.typeSelected) {
      return <ActionForm 
        submitAction={this.submitAction}
        selectActionType={this.selectActionType} 
        group={this.props.group} 
        userId={this.props.userId}
        type={this.state.actionType} 
      />;
    }
    else 
      return (
        <div
          id="action-bar"
        >
          <div
            id="pay-button"
            onClick={(e) => this.selectActionType(e, 'pay')}
          >
            Pay
          </div>
          <div
            id="req-button"
            onClick={(e) => this.selectActionType(e, 'req')}
          >
            Request
          </div>
        </div>
      );
  }

  render() {
    return this.renderBar();
  }
};

export default ActionBar;