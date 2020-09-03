import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import classnames from 'classnames'
import { Consumer } from '../../../../context'
import BASE_URL from '../../../../url'

class UpdateHospital extends Component {

    state = {
        hospital_name: '',
        email: '',
        contact_number: '',
        address: '',
        error: {}
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/hospital-profile/${id}`);
        const hospital = res.data
        this.setState({
            hospital_name: hospital.hospital_name,
            email: hospital.email,
            contact_number: hospital.contact_number,
            address: hospital.address,
        })
    }


    handleSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { hospital_name, email, contact_number, address } = this.state;

        if (hospital_name === '') {
            this.setState({ error: { hospital_name: "Hospital Name is Required" } })
            return;
        }

        if (email === '') {
            this.setState({ error: { email: "Hospital Email is Required" } })
            return;
        }

        if (contact_number === '') {
            this.setState({ error: { contact_number: "Hospital Contact Number is Required" } })
            return;
        }

        if (address === '') {
            this.setState({ error: { address: "Hospital Location is Required" } })
            return;
        }


        const { id } = this.props.match.params;

        const updatedHospital = {
            hospital_name,
            email,
            address,
            contact_number
        }

        const res = await axios.put(`${BASE_URL}/hospital-profile/${id}/`, updatedHospital,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            })
        dispatch({ type: "UPDATE_HOSPITAL", payload: res.data })

        this.setState({
            hospital_name: '',
            email: '',
            contact_number: '',
            address: '',
            error: {}
        })
        this.props.history.push('/bloodbank/dashboard/hospital')
        if (res.status === 200)
            toast.success("Hospital Information Updated successfully!!", { position: toast.POSITION.BOTTOM_RIGHT })
        else
            toast.error("Something went wrong !!!", { postion: toast.POSITION.BOTTOM_RIGHT })

    }

    render() {
        const { hospital_name, email, contact_number, address, error } = this.state;

        return (
            <Consumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className='container add-donor'>
                                <form className="col-md-8 mx-auto" onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                    <h4 className='py-4'>Update hospital Info </h4>
                                    {/* for name */}
                                    <div className='form-group'>
                                        <label htmlFor="hospital_name">Hospital Name</label>
                                        <input type="text"
                                            name="hospital_name"
                                            value={hospital_name}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': error.hospital_name })}
                                            placeholder="Enter hospital Name"
                                            name='hospital_name'
                                            value={hospital_name}
                                            onChange={this.onInputChange} />
                                        {error.hospital_name &&
                                            <div className="invalid-feedback">{error.hospital_name}</div>
                                        }
                                    </div>

                                    {/* for email */}

                                    <div className='form-group'>
                                        <label htmlFor="email">Hospital Email</label>
                                        <input type="email"
                                            name="email"
                                            value={email}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': error.email })}
                                            placeholder="Enter hospital Email"
                                            name='email'
                                            value={email}
                                            onChange={this.onInputChange} />
                                        {error.email &&
                                            <div className="invalid-feedback">{error.email}</div>
                                        }
                                    </div>


                                    {/* for contact no */}

                                    <div className='form-group'>
                                        <label htmlFor="contact_number">Hospital Contact Number</label>
                                        <input type="text"
                                            name="contact_number"
                                            value={contact_number}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': error.contact_number })}
                                            placeholder="Enter hospital Contact Number"
                                            name='contact_number'
                                            value={contact_number}
                                            onChange={this.onInputChange} />
                                        {error.contact_number &&
                                            <div className="invalid-feedback">{error.contact_number}</div>
                                        }
                                    </div>

                                    {/* for location */}
                                    <div className='form-group'>
                                        <label htmlFor="address">Hospital Location</label>
                                        <input type="text"
                                            name="address"
                                            value={address}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': error.address })}
                                            placeholder="Enter hospital Address"
                                            name='address'
                                            value={address}
                                            onChange={this.onInputChange} />
                                        {error.address &&
                                            <div className="invalid-feedback">{error.address}</div>
                                        }
                                    </div>
                                    <button type='submit' className='btn btn-danger mb-4'>Update Hospital</button>

                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}
export default UpdateHospital