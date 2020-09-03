import React, { Component } from 'react';
import classnames from 'classnames';
import { Consumer } from '../../context';
import axios from 'axios';
import BASE_URL from '../../url';
import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer'

export default class Volunteer_form extends Component {
    state = {
        volunteer_name: '',
        volunteer_address: '',
        volunteer_mobile_number: '',
        volunteer_role: 'nurse',
        register_for_campaign: '',
        volunteer_profile_pic: null,
        errors: {}
    }
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    handleImageChange = (event) => {
        this.setState({ volunteer_profile_pic: event.target.files[0] })
    }
    onFormSubmit = async (event) => {
        event.preventDefault();
        const { volunteer_name, volunteer_address, volunteer_mobile_number, volunteer_role, register_for_campaign } = this.state;
        if (volunteer_name === '') {
            this.setState({ errors: { name: "Full Name is Required!" } })
            return;
        }
        if (volunteer_address === '') {
            this.setState({ errors: { address: "Address is Required!" } })
            return;
        }
        if (volunteer_mobile_number === '') {
            this.setState({ errors: { mobile_number: "Mobile Number is Required!" } })
            return;
        }
        if (volunteer_role === '') {
            this.setState({ errors: { role: "Role is Required!" } })
            return;
        }
        if (register_for_campaign === '') {
            this.setState({ errors: { campaign: "Campaign is Required!" } })
            return;
        }
        const formData = new FormData();
        formData.append("volunteer_name", this.state.volunteer_name);
        formData.append("volunteer_address", this.state.volunteer_address);
        formData.append("volunteer_mobile_number", this.state.volunteer_mobile_number);
        formData.append("volunteer_role", this.state.volunteer_role);
        formData.append("register_for_campaign", this.state.register_for_campaign);
        formData.append("volunteer_profile_pic", this.state.volunteer_profile_pic, this.state.volunteer_profile_pic.name);
        await axios.post(`${BASE_URL}/volunteer/`, formData).then(
            res => console.log("volunteer data =", res.data)
        )



    }
    render() {
        const { volunteer_name, volunteer_address, volunteer_mobile_number, volunteer_role, register_for_campaign, errors } = this.state;
        return (
            <Consumer>
                {
                    (value) => {
                        const { campaigns } = value;


                        return (
                            <>
                                <SocialMedia />
                                <Navigation />
                                <div className="donor-registration">
                                    <div className="donor-registration-title">
                                        <h4>Volunteer Registration Form </h4>
                                    </div>
                                    <div className="card col-md-8 mx-auto pt-4">
                                        <p>Please fill up the form to Volunteer </p>
                                        <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
                                            <div className='form-group'>
                                                <label htmlFor='volunteer name'>Volunteer Name</label>
                                                <input
                                                    type='text'
                                                    className={classnames('form-control', { 'is-invalid': errors.name })}
                                                    placeholder='Enter Volunteer Name'
                                                    name='volunteer_name'
                                                    value={volunteer_name}
                                                    onChange={this.onInputChange}
                                                />
                                                {
                                                    errors.name &&
                                                    <div className="invalid-feedback">{errors.name}</div>
                                                }
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='volunteer name'>Volunteer Address</label>
                                                <input
                                                    type='text'
                                                    className={classnames('form-control', { 'is-invalid': errors.address })}
                                                    placeholder='Enter Volunteer Address'
                                                    name='volunteer_address'
                                                    value={volunteer_address}
                                                    onChange={this.onInputChange}
                                                />
                                                {
                                                    errors.address &&
                                                    <div className="invalid-feedback">{errors.address}</div>
                                                }
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='volunteer name'>Mobile Number</label>
                                                <input
                                                    type='text'
                                                    className={classnames('form-control', { 'is-invalid': errors.mobile_number })}
                                                    placeholder='Enter Mobile Number'
                                                    name='volunteer_mobile_number'
                                                    value={volunteer_mobile_number}
                                                    onChange={this.onInputChange}
                                                />
                                                {
                                                    errors.mobile_number &&
                                                    <div className="invalid-feedback">{errors.mobile_number}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="role">Volunteer Role</label>
                                                <select className={classnames('form-control', { 'is-invalid': errors.role })} name='volunteer_role' value={volunteer_role} onChange={this.onInputChange} >
                                                    <option value='nurse'>Nurse</option>
                                                    <option value='assistant'>Assistant</option>
                                                </select>
                                                {
                                                    errors.role &&
                                                    <div className="invalid-feedback">{errors.role}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="campaign">Campaign</label>
                                                <select className={classnames('form-control', { 'is-invalid': errors.campaign })} name='register_for_campaign' value={register_for_campaign} onChange={this.onInputChange} >
                                                    {
                                                        campaigns.map((campign) => (
                                                            <option key={campign.id} value={campign.id}>{campign.campaign_name}</option>
                                                        ))

                                                    }

                                                </select>
                                                {
                                                    errors.campaign &&
                                                    <div className="invalid-feedback">{errors.role}</div>
                                                }
                                            </div>
                                            <div className='form-group' style={{ margin: "30px 0" }}>
                                                <label htmlFor='profile picture'>Profile Picture</label>
                                                <input type='file' className='form-control-file' accept="image/*" onChange={this.handleImageChange} />
                                            </div>
                                            <button type="submit">Register</button>;
                            </form>
                                    </div>
                                </div>
                                <Footer />
                            </>
                        )

                    }
                }
            </Consumer>
        )

    }
}
