import React from 'react';
import ReactDOM from 'react-dom';
import { 
  createStore,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import user from './redux/reducers/user';
import transactions from './redux/reducers/transactions';
import group from './redux/reducers/group';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { App } from './components/_index';
import registerServiceWorker from './registerServiceWorker';


const masterReducer = combineReducers({ user, transactions, group });
export const store = createStore(masterReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path="/app" component={App} />
          <Route path="*" render={() => <Link to="/app" >Page Not Found</Link>} />
        </Switch>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
