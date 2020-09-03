import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import classnames from 'classnames';
import { Consumer } from '../../../../context'
import BASE_URL from '../../../../url'

class UpdateSponsorAdmin extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        amount: '',
        type: 'personal',
        phone_number: '',
        error: {}
    }
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/sponsor/${id}/`);
        const sponsor = response.data;
        this.setState({
            name: sponsor.sponsor_name,
            address: sponsor.sponsor_address,
            email: sponsor.sponsor_email,
            type: sponsor.sponsor_type,
            amount: sponsor.sponsor_amount,
            phone_number: sponsor.phone_number
        })
    }

    onFormSubmit = async (dispatch,e) => {
        e.preventDefault();
        const { name, address, email, amount, type, phone_number } = this.state;
        if (name === "") {
            this.setState({ error: { name: "Full Name is Required" } });
            return;
        }
        if (address === "") {
            this.setState({ error: { address: "Address is Required" } });
            return;
        }
        if (email === "") {
            this.setState({ error: { email: "Email is Required" } });
            return;
        }
        if (amount === "") {
            this.setState({ error: { amount: "Amount is Required" } });
            return;
        }
        if (type === "") {
            this.setState({ error: { type: "Sponsor Type is Required" } });
            return;
        }
        if (phone_number === "") {
            this.setState({ error: { phone_number: "Phone Number is Required" } });
            return;
        }
        const updatedSponsor = {
            "sponsor_name": name,
            "sponsor_email": email,
            "sponsor_amount": amount,
            "sponsor_type": type,
            "phone_number": phone_number,
            "sponsor_address": address
        }
        const { id } = this.props.match.params;
        const res = await axios.put(`${BASE_URL}/sponsor/${id}/`,updatedSponsor,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        dispatch({ type: "UPDATE_SPONSOR", payload: res.data })
        this.setState({
            name: '',
            email: '',
            amount: '',
            type: '',
            phone_number: '',
            address: ''
        })

        this.props.history.push("/bloodbank/dashboard/sponsor");
        if (res.status === 200)
            toast.success("Sponsor Updated Successfully!!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        else
            toast.error("something went wrong", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })

    }

    render() {
        const { name, address, email, type, amount, phone_number, error } = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="container add-donor">

                                <form className="col-md-8 mx-auto" onSubmit={this.onFormSubmit.bind(this, dispatch)}>
                                    <h4>Update Sponsor Information </h4>
                                    <div className="form-group">
                                        <label htmlFor="sponsor_name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={classnames("form-control", {
                                                "is-invalid": error.hospital_name
                                            })}
                                            placeholder='Enter Full Name'
                                            value={name}
                                            onChange={this.onInputChange}
                                        />
                                        {error.name &&
                                            <div className="invalid-feedback">{error.name}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={classnames("form-control", {
                                                "is-invalid": error.email
                                            })}
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={this.onInputChange}
                                        />
                                        {error.email &&
                                            <div className="invalid-feedback">{error.email}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Sponsor Type</label>
                                        <select className={classnames('form-control', { 'is-invalid': error.type })} name='type' value={type} onChange={this.onInputChange} >
                                            <option value='personal'>Personal</option>
                                            <option value='organizational'>Organizational</option>
                                        </select>
                                        {
                                            error.type &&
                                            <div className="invalid-feedback">{error.type}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact_number">Contact Number</label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            className={classnames("form-control", {
                                                "is-invalid": error.phone_number
                                            })}
                                            placeholder='Enter Phone Number'
                                            value={phone_number}
                                            onChange={this.onInputChange}
                                        />
                                        {error.phone_number &&
                                            <div className="invalid-feedback">{error.phone_number}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact_number">Amount</label>
                                        <input
                                            type="text"
                                            name="amount"
                                            className={classnames("form-control", {
                                                "is-invalid": error.amount
                                            })}
                                            placeholder='Enter Amount '
                                            value={amount}
                                            onChange={this.onInputChange}
                                        />
                                        {error.amount &&
                                            <div className="invalid-feedback">{error.amount}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className={classnames("form-control", {
                                                "is-invalid": error.address
                                            })}
                                            placeholder='Enter Address'
                                            value={address}
                                            onChange={this.onInputChange}
                                        />
                                        {error.address &&
                                            <div className="invalid-feedback">{error.address}</div>
                                        }
                                    </div>
                                    <button type='submit' className='btn btn-danger mb-4'>Update Sponsor</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        );
    }
}

export default UpdateSponsorAdmin;