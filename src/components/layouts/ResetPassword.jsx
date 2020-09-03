import React, { Component } from 'react';
import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer';
import axios from 'axios';
import BASE_URL from '../../url';
import classnames from 'classnames';
class ResetPassword extends Component {
    state = {
        password: '',
        confirm_password: '',
        errors: {}
    }
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onFormSubmit = async (e) => {
        e.preventDefault();
        const { password, confirm_password } = this.state;
        if (password === '') {
            this.setState({ errors: { password: "Password is Required!" } })
            return;
        }
        if (confirm_password === '') {
            this.setState({ errors: { confirm_password: "Password is Required!" } })
            return;
        }
   
        const token = this.props.location.search.split('=');
        const newpassword = {
            'password': this.state.password,
            'token': token[1]
        }
        await axios.post(`${BASE_URL}/password_reset/confirm/password_reset/`, newpassword).then(
            res => {
                if (res.status === 200) {
                    alert("Password Change Successfully")
                }
                else {
                    alert("Error in changing password")
                }
            }

        )
        this.setState({
            'password': '',
            'confirm_password': '',
            'errors': {}
        })
    }
    render() {
        const { password, confirm_password,errors } = this.state;
        let password_validations = '';
        if (this.state.confirm_password) {
            if (this.state.password !== this.state.confirm_password) {
                password_validations = <span style={{ color: 'red' }}>Password Not Matched.</span>
            }
        }
        return (
            <div>
                <SocialMedia />
                <Navigation />
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6 login-container  card">
                            <div className="card-body">
                                <h3 className="text-center">Reset Password</h3>
                                <form className="login-form" onSubmit={this.onFormSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor='password'>New Password</label>
                                        <input type='password' className={classnames('form-control', { 'is-invalid': errors.password })} placeholder='Enter Password' name='password' onChange={this.onInputChange} value={password} />
                                        {
                                            errors.password &&
                                            <div className="invalid-feedback">{errors.password}</div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password'>Confirm Password</label>
                                        <input type='password' className={classnames('form-control', { 'is-invalid': errors.confirm_password })} placeholder='Re-enter Password' name='confirm_password' onChange={this.onInputChange} value={confirm_password} />
                                        {
                                            errors.confirm_password &&
                                            <div className="invalid-feedback">{errors.confirm_password}</div>
                                        }
                                          {password_validations}
                                     
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-success">Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ResetPassword;