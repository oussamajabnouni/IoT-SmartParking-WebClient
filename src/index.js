import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import themeDefault from './themeDefault';
import store from './store';

import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Owners from './containers/Owners';
import Parkings from './containers/Parkings';
import EditParking from './containers/EditParking';
import MyParkings from './containers/Myparkings';
import AddOwner from './containers/AddOwner';
import AddParking from './containers/AddParking';
import Settings from './containers/Settings';
import {StripeProvider} from 'react-stripe-elements';
import './styles.css';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();


ReactDOM.render((
    <MuiThemeProvider muiTheme={themeDefault}>
      <StripeProvider apiKey="pk_test_12345">
      <div>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} > 
            <IndexRoute component={Home} />
            <Route path="owners" component={Owners} />
            <Route path="parkings" component={Parkings} />
            <Route path="editparking/:id" component={EditParking} />
            <Route path="myparkings" component={MyParkings} />
            <Route path="addowner" component={AddOwner} />
            <Route path="addparking" component={AddParking} />
            <Route path="settings" component={Settings} />
            <Route path="login" component={Login} />
          </Route>
        </Router>
      </Provider>
      </div>
      </StripeProvider>
    </MuiThemeProvider>
), document.getElementById('root'));
