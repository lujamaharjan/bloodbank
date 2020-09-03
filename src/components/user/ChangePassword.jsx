import React, { Component } from 'react';

import axios from 'axios';
import BASE_URL from '../../url';
import { UserContext } from '../../context/UserContext';

class ChangePassword extends Component {
  static contextType = UserContext;

  state = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    let formData = { ...this.state };

    axios
      .put(`${BASE_URL}/change_password/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        console.log(data.headers);
        alert('Password changed Successfully');
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    const { old_password, new_password, confirm_password } = this.state;
    return (
      <UserContext.Consumer>
        {(context) => {
          return (
            <div className='container'>
              <div className='card col-md-8 mx-auto p-4'>
                <form onSubmit={this.onFormSubmit}>
                  <div className='form-group '>
                    <label className='col-md-4' htmlFor='password'>
                      Current Password
                    </label>
                    <input
                      type='password'
                      placeholder='Enter Password'
                      onChange={this.onInputChange}
                      className='col-md-6'
                      value={old_password}
                      name='old_password'
                    />
                  </div>
                  <div className='form-group'>
                    <label className='col-md-4' htmlFor='password'>
                      New Password
                    </label>
                    <input
                      type='password'
                      placeholder='Enter Password'
                      onChange={this.onInputChange}
                      className='col-md-6'
                      value={new_password}
                      name='new_password'
                    />
                  </div>
                  <div className='form-group'>
                    <label className='col-md-4' htmlFor='password'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      placeholder='Re-enter Password'
                      onChange={this.onInputChange}
                      className='col-md-6'
                      value={confirm_password}
                      name='confirm_password'
                    />
                  </div>
                  <div className='text-center'>
                    <button type='submit' className=' btn btn-danger '>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default ChangePassword;
