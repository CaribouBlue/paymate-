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

    this.state = {};
  }

  componentWillMount() {
    getUserTransactions(this.props.user.id);
    getGroup(this.props.user.groupId, this.props.user.id);
  }

  render() {
    return (
      <Router>
        <div>
          <ActionBar group={this.props.group} userId={this.props.user.id}/>
          <NavBar />
          <Switch>
            <Route 
              path="/app/dash" 
              render={(routerProps) => 
                <Dash 
                  {...routerProps}
                  group={this.props.group} 
                  transactions={this.props.transactions}
                />
              }
            />
            <Route 
              path="*" 
              render={(routerProps) => 
                <Dash 
                  {...routerProps} 
                  group={this.props.group}
                  transactions={this.props.transactions} 
                />
              } 
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