import React from 'react';

class ActionFormView extends React.Component {

  render() {
    return (
      <div
        id="action-form"
      >
        <div
          id="form-buttons"
        >
          <div
            id="submit"
            onClick={this.props.handleSubmit}
          >
            Submit
          </div>
          <div
            id="cancel"
            onClick={this.props.setActionType}
          >
            Cancel
          </div>
        </div>
        <div
          id="checkboxes"
        >
          {this.props.memberCheckboxes}
        </div>
        <div
          id="flex-inputs"
        >
          <input
            id="date"
            type="date"
            name="date"
            onChange={this.props.handleChange}
            value={this.props.date}
          />
          <input
            id="name"
            type="text"
            name="name"
            placeholder="What for?"
            onChange={this.props.handleChange}
            value={this.props.name}
          />
          <input
            id="amount"
            type="text"
            name="amount"
            onChange={this.props.handleChange}
            value={this.props.amount}
          />
        </div>
      </div>
    );
  }
};

export default ActionFormView;