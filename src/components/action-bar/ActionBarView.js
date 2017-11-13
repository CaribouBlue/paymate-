import React from 'react';
import { ActionForm } from '../_index';

class ActionBarView extends React.Component {

  renderActionForm() {
    return <ActionForm 
      submitAction={this.props.submitAction}
      setActionType={this.props.setActionType} 
      group={this.props.group} 
      userId={this.props.userId}
      type={this.props.actionType} 
    />;
  }

  renderActionButtons() {
    return (
      <div
        id="action-bar"
      >
        <div
          id="pay-button"
          onClick={(e) => this.props.setActionType(e, 'pay')}
        >
          Pay
        </div>
        <div
          id="req-button"
          onClick={(e) => this.props.setActionType(e, 'req')}
        >
          Request
        </div>
      </div>
    );
  }

  render() {
    if (this.props.actionType === 'none')
      return this.renderActionButtons();
    else
      return this.renderActionForm();
  }

};

export default ActionBarView;