import React, { Component, useContext } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from './context';
import './App.css';

import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Announcement from './components/pages/Announcement';
import AnnouncementDetail from './components/pages/AnnouncementDetail';
import HospitalRegistrationPage from './components/pages/HospitalRegistrationPage';
import DonorRegistrationPage from './components/pages/DonorRegistrationPage';
import DonorProfilePage from './components/pages/DonorProfilePage';
import DonorProfileEditPage from './components/pages/DonorProfileEditPage';


import Dashboard from './components/admin/Dashboard';

import './App.css';
import ForgotPassword from './components/layouts/ForgotPassword';
import ResetPassword from './components/layouts/ResetPassword';
import Volunteer_form from './components/layouts/Volunteer_form';
import UserContextProvider, { UserContext } from './context/UserContext';

// const isAuthenticated = false;
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }) {
  const value = useContext(UserContext);
  const isAuthenticated = value.value.state.isLoggedIn;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
}

// protected route for super admin
function SuperUserPrivateRoutes({ component: Component, ...rest }) {
  const value = useContext(UserContext);
  // check if user is super admin
  const isSuperAdmin = JSON.parse(localStorage.getItem('isSuperAdmin'));
  const isAuthenticatedSuperAdmin =
    value.value.state.isLoggedIn && isSuperAdmin;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticatedSuperAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

class App extends Component {
  render() {
    return (
      <Provider>
        <UserContextProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/contact-us' component={Contact} />
              <Route exact path='/about-us' component={About} />
              <Route exact path='/announcement' component={Announcement} />
              <Route
                exact
                path='/announcement/:id'
                component={AnnouncementDetail}
              />
              <Route exact path='/login' component={Login} />
              <Route
                exact
                path='/hospital/registration'
                component={HospitalRegistrationPage}
              />
              <Route
                exact
                path='/donor/registration'
                component={DonorRegistrationPage}
              />

              <Route
                exact
                path='/forgot-password/'
                component={ForgotPassword}
              />
              <Route
                exact
                path='/password_reset/confirm/password_reset'
                component={ResetPassword}
              />
              <Route
                exact
                path='/volunteer/registration'
                component={Volunteer_form}
              />
              <PrivateRoute
                exact
                path='/donor/edit/:id'
                component={DonorProfileEditPage}
              />
              <PrivateRoute
                exact
                path='/donor/detail/:id'
                component={DonorProfilePage}
              />
              {/* Admin Routes */}
              <SuperUserPrivateRoutes
                path='/bloodbank/dashboard'
                component={Dashboard}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </UserContextProvider>
      </Provider>
    );
  }
}

export default App;
