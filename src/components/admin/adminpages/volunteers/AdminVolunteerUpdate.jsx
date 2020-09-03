import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

import classnames from 'classnames';
import { Consumer } from '../../../../context'
import BASE_URL from '../../../../url'

class AdminVolunteerUpdate extends Component {
    state = {
        name: '',
        address: '',
        mobile_number: '',
        role: '',
        campaign: '',
        profile_picture: null,
        errors: {}
    }
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleImageChange = (event) => {
        this.setState({ profile_picture: event.target.files[0] })
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/volunteer/${id}/`);
        const volunteer = response.data;
        this.setState({
            name: volunteer.volunteer_name,
            address: volunteer.volunteer_address,
            mobile_number: volunteer.volunteer_mobile_number,
            role: volunteer.volunteer_role,
            campaign: volunteer.register_for_campaign,
            profile_picture: volunteer.volunteer_profile_pic,
        })
    }
    handleSubmit = async (dispatch,e) => {
        const { name, address, mobile_number, role, campaign, profile_picture } = this.state;
        e.preventDefault();
        if (name === "") {
            this.setState({ errors: { name: "Name is required!" } })
        }
        if (address === "") {
            this.setState({ errors: { address: "Address is Required!" } })
            return;
        }
        if (mobile_number === '') {
            this.setState({ errors: { mobile_number: "Mobile Number is Required!" } })
            return;
        }
        if (role === "") {
            this.setState({ errors: { role: "Role is required!" } })
        }
        if (campaign === "") {
            this.setState({ errors: { campaign: "Campaign is Required!" } })
            return;
        }
        if (profile_picture === '') {
            this.setState({ errors: { profile_picture: "Profile Picture is Required!" } })
            return;
        }
        const { id } = this.props.match.params
        const formData = new FormData();
        formData.append("volunteer_name", name);
        formData.append("volunteer_address", address);
        formData.append("volunteer_mobile_number", mobile_number);
        formData.append("volunteer_role", role);
        formData.append("register_for_campaign", campaign);
        if(profile_picture !== null)
            formData.append("volunteer_profile_pic", profile_picture, profile_picture.name);
        const res = await axios.put(`${BASE_URL}/volunteer/${id}/`, formData,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        dispatch({ type: "UPDATE_VOLUNTEER", payload: res.data })
        this.setState({
            name: '',
            address: '',
            mobile_number: '',
            role: '',
            campaign: '',
            profile_picture: ''
        })
        this.props.history.push('/bloodbank/dashboard/volunteers')
        if (res.status === 200)
            toast.success("Volunteer update sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
        else
            toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })


    }


    render() {
        const { name, address, mobile_number, role, campaign, errors } = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const { dispatch } = value;
                        const { campaigns } = value;
                        return (
                            <div className="container add-donor">
                                <form className="col-md-8 mx-auto"  onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                <h4 className="py-4">Update Volunteer Informations</h4>
                                    <div className='form-group' >
                                        <label htmlFor='full name'>Full Name</label>
                                        <input
                                            type='text'
                                            className={classnames('form-control', { 'is-invalid': errors.name })}
                                            placeholder='Enter Your full name'
                                            name='name'
                                            value={name}
                                            onChange={this.onInputChange} />
                                        {
                                            errors.name &&
                                            <div className="invalid-feedback">{errors.name}</div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='address'>Address</label>
                                        <input
                                            type='text'
                                            className={classnames('form-control', { 'is-invalid': errors.address })}
                                            placeholder='Enter Your Address'
                                            name='address'
                                            onChange={this.onInputChange}
                                            value={address} />
                                        {
                                            errors.address &&
                                            <div className="invalid-feedback">{errors.address}</div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='contact number'>Mobile Number</label>
                                        <input
                                            type='text'
                                            className={classnames('form-control', { 'is-invalid': errors.contact_number })}
                                            placeholder='Enter Your Mobile Number'
                                            name='mobile_number'
                                            value={mobile_number}
                                            onChange={this.onInputChange} />
                                        {
                                            errors.mobile_number &&
                                            <div className="invalid-feedback">{errors.mobile_number}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Volunteer Role</label>
                                        <select className={classnames('form-control', { 'is-invalid': errors.role })} name='role' value={role} onChange={this.onInputChange} >
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
                                        <select className={classnames('form-control', { 'is-invalid': errors.campaign })} name='campaign' value={campaign} onChange={this.onInputChange} >
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
                                        <input
                                            type='file'
                                            className='form-control-file'
                                            name="profile_picture"
                                            accept="image/*"
                                            onChange={this.handleImageChange} />
                                    </div>
                                    <button type="submit" className="btn btn-danger mb-4"> Update </button>
                                </form>
                            </div>

                        )
                    }
                }
            </Consumer>
        );
    }
}

export default AdminVolunteerUpdate;