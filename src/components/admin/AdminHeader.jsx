import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import BASE_URL from '../../url';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

class AdminHeader extends Component {
  static contextType = UserContext;
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
          return (
            <div className='admin-header'>
              <div className='logo'>
                <p
                  onClick={() => {
                    window.location.reload(false);
                  }}
                >
                  <Link to='/'>Home</Link>
                </p>
              </div>

              <div className='header-menu'>
                <i onClick={this.logout} className='fa fa-power-off'></i>
                <i className='fa fa-bell-o'></i>
                <i className='fa fa-envelope-o'></i>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(AdminHeader);
