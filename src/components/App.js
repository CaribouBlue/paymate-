import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { getUserTransactions } from '../redux/actions/transactions';
import { getGroup } from '../redux/actions/group';
import {
  Dash,
  ActionBar,
  NavBar,
} from './_index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayList: [],
    };

    this.dashRender = this.dashRender.bind(this);
  }

  componentWillMount() {
    getUserTransactions(this.props.user.id);
    getGroup(this.props.user.groupId, this.props.user.id);
  }

  getdayList() {
    const dayList = {};
    Object.values(this.props.transactions).forEach((t) => dayList[t.date] = null);
    return dayList;
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.transactions) !== JSON.stringify(this.props.transactions))
      this.setState({ dayList: this.getdayList() });
  }

  dashRender(routerProps) {
    return (
      <Dash 
        {...routerProps}
        group={this.props.group} 
        transactions={this.props.transactions}
        dayList={this.state.dayList}
        userId={this.props.user.id}
      />
    );
  }

  render() {
    this.getdayList();
    return (
      <Router>
        <div>
          <ActionBar group={this.props.group} userId={this.props.user.id}/>
          <NavBar />
          <Switch>
            <Route 
              path="/app/dash" 
              render={this.dashRender}
            />
            <Route 
              path="*" 
              render={this.dashRender} 
            />
          </Switch>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps};
}

export default connect(mapStateToProps)(App);