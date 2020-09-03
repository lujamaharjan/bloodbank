import React, { Component } from 'react';
import { UserContext } from '../../context/UserContext';
import { withRouter } from 'react-router-dom';
import BASE_URL from '../../url';
import axios from 'axios';

class LoginButton extends Component {
  static contextType = UserContext;

  // function for handling login event
  login = (e) => {
    this.props.history.push('/login');
  };

  // function for handling logout event
  logout = () => {
    axios
      .post(`${BASE_URL}/logout/`)
      .then((data) => {
        this.context.logoutUser();
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <UserContext.Consumer>
        {(context) => {
          const { isLoggedIn } = context.value.state;
          return (
            <>
              <button
                className='login-btn btn font-weight-bold '
                onClick={
                  !isLoggedIn ? (e) => this.login(e) : (e) => this.logout(e)
                }
              >
                {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
              </button>
            </>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(LoginButton);
