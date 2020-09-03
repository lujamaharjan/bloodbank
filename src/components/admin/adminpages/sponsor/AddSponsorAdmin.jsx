import React, { Component } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../../../url";
import classnames from "classnames";

class AddSponsorAdmin extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        amount: '',
        type: 'personal',
        phone_number: '',
        error: {}
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    onFormSubmit = async (e) => {
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
        const newSponsor = {
            "sponsor_name":name,
            "sponsor_email":email,
            "sponsor_amount":amount,
            "sponsor_type":type,
            "phone_number":phone_number,
            "sponsor_address":address
        }
        const res = await axios.post(`${BASE_URL}/sponsor/`, newSponsor,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          });

        this.setState({
            name: '',
            email: '',
            amount: '',
            type: '',
            phone_number: '',
            address: ''
        })

        this.props.history.push("/bloodbank/dashboard/sponsor");
        if (res.status === 201)
            toast.success("Sponsor added successfully!!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        else
            toast.error("something went wrong", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        window.location.reload(false)

    }


    render() {
        const { name, email, address, amount, type, phone_number, error } = this.state;
        return (
            <div className="container add-donor">

                <form className="col-md-8 mx-auto" onSubmit={this.onFormSubmit}>
                    <h4>Add New Sponsor </h4>
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
                    <button type='submit' className='btn btn-danger mb-4'>Add Sponsor</button>
                </form>
            </div>
        );
    }
}

export default AddSponsorAdmin;