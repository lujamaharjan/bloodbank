import React, { Component } from 'react';
import './../../App.css';
import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer';
import BASE_URL from '../../url';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    email: '',
    password: '',
    errors: {},
    username: '',
    displayed_form: '',
  };

  // prevent going to logout page on back clicked
  componentDidMount = () => {
    const { isLoggedIn, id } = this.context.value.state;
    if (isLoggedIn) {
      this.props.history.push(`/donor/detail/${id}`);
    }
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email === '') {
      this.setState({ errors: { email: 'Email is Required!' } });
      return;
    }
    if (password === '') {
      this.setState({ errors: { password: 'Password is Required!' } });
      return;
    }
    const userLogin = {
      email: email,
      password: password,
    };
    await axios
      .post(`${BASE_URL}/login/`, userLogin)
      .then((res) => {
        // set required data into localstorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user_id);
        localStorage.setItem('isHospital', res.data.is_hospital);
        localStorage.setItem('isDonor', res.data.is_donor);
        localStorage.setItem('isSuperAdmin', res.data.is_superuser);

        // change state in UserContext
        // setstate isLogeedIn = true and set user id
        this.context.loginUser();
        this.context.setUserId(res.data.user_id);

        // set the user Role
        if (res.data.is_hospital) this.context.setIsHospital();
        if (res.data.is_donor) this.context.setIsDonor();
        if (res.data.is_superuser) this.context.setSuperUser();

        // redirect to page based on user role
        if (res.data.is_superuser) {
          this.props.history.push(`/bloodbank/dashboard`);
        } else {
          this.props.history.push(`/donor/detail/${res.data.user_id}`);
        }
      })
      .catch((error) => {
        alert('Invalid Credentials');
      });
  };

  render() {
    return (
      <UserContext.Consumer>
        {(context) => {
          const { email, password, errors } = this.state;
          return (
            <>
              <SocialMedia />
              <Navigation />
              <div className='container my-4'>
                <div className='row'>
                  <div className='col-md-6 login-container card mx-auto'>
                    <div className='card-body'>
                      <h3 className='text-center'>Login</h3>
                      <form className='login-form' onSubmit={this.onLogin}>
                        <div className='form-group'>
                          <label htmlFor='email'>Email Address</label>
                          <input
                            type='email'
                            className={classnames('form-control', {
                              'is-invalid': errors.email,
                            })}
                            placeholder='Enter Your Email Address'
                            name='email'
                            onChange={this.onInputChange}
                            value={email}
                          />
                          {errors.email && (
                            <div className='invalid-feedback'>
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className='form-group'>
                          <label htmlFor='password'>Password</label>
                          <input
                            type='password'
                            className={classnames('form-control', {
                              'is-invalid': errors.password,
                            })}
                            placeholder='Enter Password'
                            name='password'
                            onChange={this.onInputChange}
                            value={password}
                          />
                          {errors.password && (
                            <div className='invalid-feedback'>
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className='form-group text-center'>
                          <button type='submit' className='btn btn-success'>
                            Login{' '}
                          </button>
                        </div>
                        <div className='form-group'>
                          <Link to='forgot-password'>Forgot Password</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default LoginForm;
