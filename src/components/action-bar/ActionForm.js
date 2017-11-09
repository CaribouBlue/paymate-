import React from 'react';
import _ from 'lodash';

class PayForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '$0.00',
      date: this.getToday(),
      members: {},
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidations = this.handleValidations.bind(this);
  }

  validateAmount(value) {
    value = value.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/g, '');
    let match = value.match(/\..*/) || [];
    if (match[0]) {
      if (match[0].length === 2)
        value += '0';
      else if (match[0].length === 1)
        value += '00';
      else if (match[0].length > 3)
        value = value.slice(0, value.indexOf('.') + 3);
    } else {
      value += '.00';
    }
    return value;
  }

  getToday() {
    const d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getYear() + 1900;
    if (month < 10)
      month = '0' + month;
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  }

  handleValidations(e, cb) {
    e.preventDefault();
    this.setState({ amount: this.validateAmount(this.state.amount)}, cb);
  }

  handleSubmit() {
    this.props.submitAction(
      this.props.type, 
      this.state.amount, 
      this.state.date, 
      Object.keys(this.state.members).map(Number),
    );
    this.props.selectActionType();
  }

  handleChange({ target }) {
    const name = target.name;
    const value = target.value;
    if (name === 'member') {
      const id = target.id;
      const checked = target.checked;
      if (checked)
        this.setState({ 
          members: { 
            ...this.state.members, 
            [id]: { 
              id, 
              userName: value, 
            } 
          } 
        });
      else {
        const members = { ...this.state.members };
        delete members[id];
        this.setState({ members });
      }
    } if (name === 'amount') {
      this.setState({ [name]: '$' + value.replace(/[$]/g, '') });
    } else {
      this.setState({ [name]: value });
    }
  }

  renderMemberCheckboxes() {
    return this.props.group.map(member =>
        <div
          key={_.uniqueId()}
        >
          <input 
            type="checkbox" 
            id={member.id} 
            name="member" 
            value={member.userName}
            onChange={this.handleChange}
            checked={!!this.state.members[member.id]}
          />
          <label>{member.firstName}</label>
        </div>
    );
  }

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
            onClick={(e) => this.handleValidations(e, this.handleSubmit)}
          >
            Submit
          </div>
          <div
            id="cancel"
            onClick={this.props.selectActionType}
          >
            Cancel
          </div>
        </div>
        <div
          id="checkboxes"
        >
          {this.renderMemberCheckboxes()}
        </div>
        <form
          onSubmit={this.handleValidations}
        >
          <div
            className="date-box"
          >
            <input
              type="date"
              name="date"
              onChange={this.handleChange}
              value={this.state.date}
            />
          </div>
          <div
            className="name-box"
          >
            <input
              type="text"
              name="name"
              placeholder="What for?"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div
            className="amount-box"
          >
            <input
              type="text"
              name="amount"
              onChange={this.handleChange}
              value={this.state.amount}
            />
          </div>
        </form>
      </div>
    );
  }
};

export default PayForm;