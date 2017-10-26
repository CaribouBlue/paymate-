import React from 'react';
import _ from 'lodash';

class PayForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '0.00',
      date: this.getToday(),
      members: {},
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
    if (month.length < 2)
      month = '0' + month;
    if (day.lnegth < 2) {
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
      <div>
        <div>
          <div
            onClick={(e) => this.handleValidations(e, this.handleSubmit)}
          >
            Submit
          </div>
          <div
            onClick={this.props.selectActionType}
          >
            Cancel
          </div>
        </div>
        <form
          onSubmit={this.handleValidations}
        >
          <div>
            {this.renderMemberCheckboxes()}
          </div>
          $
          <input
            type="text"
            name="amount"
            onChange={this.handleChange}
            value={this.state.amount}
          />
          <input
            type="date"
            name="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
        </form>
      </div>
    );
  }
};

export default PayForm;