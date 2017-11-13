import React from 'react';
import _ from 'lodash';
import { ActionFormView as View } from "../_index";

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

  handleSubmit(e) {
    e.preventDefault();
    const amount = this.validateAmount(this.state.amount);
    this.props.submitAction(
      this.props.type, 
      amount, 
      this.state.date, 
      Object.keys(this.state.members).map(Number),
    );
    this.props.setActionType();
  }

  handleChange({ target }) {
    const name = target.name;
    let value = target.value;
    if (name === 'member') {
      const id = target.id;
      if (target.checked)
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
      if (name === 'amount') {
        value = value.replace(/[^.\d]/g, '');
      } 
      this.setState({ [name]: value });
    }
  }

  getMemberCheckboxes() {
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
    return <View
      { ...this.state }
      handleSubmit={this.handleSubmit}
      setActionType={this.props.setActionType}
      handleChange={this.handleChange}
      memberCheckboxes={this.getMemberCheckboxes()}
    />;
  }
};

export default PayForm;