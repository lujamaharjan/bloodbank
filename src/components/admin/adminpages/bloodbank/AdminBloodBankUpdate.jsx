import React, { Component } from 'react';
import classnames from 'classnames';
import BASE_URL from '../../../../url';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Consumer } from '../../../../context';

class AdminBloodBankUpdate extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        phone_number: '',
        mobile_number: '',
        logo_black: null,
        logo_white: null,
        error: {}
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleImageChangeBlack = e => {
        this.setState({
            logo_black: e.target.files[0],
        })
    }
    handleImageChangeWhite=e=>{
        this.setState({
            logo_white: e.target.files[0]
        })
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/bloodbank/${id}/`);
        const bloodbank = response.data;
        this.setState({
            name: bloodbank.blood_bank_name,
            email: bloodbank.blood_bank_email,
            address: bloodbank.blood_bank_address,
            phone_number: bloodbank.phone_number,
            mobile_number: bloodbank.mobile_number,
            logo_white: bloodbank.logo_white,
            logo_black: bloodbank.logo_black
        })
    }
    handleSubmit = async (dispatch,e) => {
        e.preventDefault();
        const { name, email, address, mobile_number, phone_number, logo_black, logo_white } = this.state;
        if (name === "") {
            this.setState({ error: { name: "Title is Required" } })
            return;
        }
        if (address === "") {
            this.setState({ error: { address: "Title is Required" } })
            return;
        }
        if (email === "") {
            this.setState({ error: { email: "Title is Required" } })
            return;
        }
        if (mobile_number === "") {
            this.setState({ error: { mobile_number: "Title is Required" } })
            return;
        }
        if (phone_number === "") {
            this.setState({ error: { phone_number: "Title is Required" } })
            return;
        }
        if (logo_black === "") {
            this.setState({ error: { logo_black: "Title is Required" } })
            return;
        }
        if (logo_white === "") {
            this.setState({ error: { logo_white: "Title is Required" } })
            return;
        }
        console.log("logo black",logo_black);
        console.log("logo white",logo_white);

        const { id } = this.props.match.params;
        const formData = new FormData();
        formData.append("blood_bank_name", name);
        formData.append("blood_bank_email", email);
        formData.append("blood_bank_address", address);
        formData.append("phone_number", phone_number);
        formData.append("mobile_number", mobile_number);
        formData.append("logo_black", logo_black, logo_black.name);
        formData.append("logo_white", logo_white, logo_white.name);
        const res = await axios.put(`${BASE_URL}/bloodbank/${id}/`, formData,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token'),{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                }
                }}`,
            }
            })
        dispatch({ type: "UPDATE_BLOODBANK", payload: res.data });
        // console.log('res data',res.data)
        this.setState({
            name: '',
            email: '',
            address: '',
            phone_number: '',
            mobile_number: '',
            logo_black: null,
            logo_white: null
        })

        this.props.history.push('/bloodbank/dashboard/bloodbank')
        if (res.status === 200)
            toast.success("BloodBank Informations Updated sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
        else
            toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })

    }
    render() {
        const { name, email, address, mobile_number, phone_number, error } = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="add-gallery container mx-auto">
                                <h4 className="py-4">Update Blood Bank Informations</h4>
                                <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text"
                                            name="name"
                                            value={name}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': this.state.error.title })}
                                            onChange={this.handleChange} />
                                        {error.name &&
                                            <div className="invalid-feedback">{error.name}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Email</label>
                                        <input type="email"
                                            name="email"
                                            value={email}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': this.state.error.email })}
                                            onChange={this.handleChange} />
                                        {error.email &&
                                            <div className="invalid-feedback">{error.email}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text"
                                            name="address"
                                            value={address}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': this.state.error.address })}
                                            onChange={this.handleChange} />
                                        {error.address &&
                                            <div className="invalid-feedback">{error.address}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Phone Number</label>
                                        <input type="text"
                                            name="phone_number"
                                            value={phone_number}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': this.state.error.phone_number })}
                                            onChange={this.handleChange} />
                                        {error.email &&
                                            <div className="invalid-feedback">{error.phone_number}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobile_number">Mobile Number</label>
                                        <input type="text"
                                            name="mobile_number"
                                            value={mobile_number}
                                            className={classnames('form-control', 'form-control-sm', { 'is-invalid': this.state.error.mobile_number })}
                                            onChange={this.handleChange} />
                                        {error.mobile_number &&
                                            <div className="invalid-feedback">{error.mobile_number}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="logo_black">Logo Black</label>
                                        <input type="file"
                                            name="logo_black"
                                            
                                            onChange={this.handleImageChangeBlack}
                                            accept="image/*" />
                                        {error.logo_black &&
                                            <div className="invalid-feedback">{error.logo_black}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="logo_white">Logo White</label>
                                        <input type="file"
                                            name="logo_white"
                                            onChange={this.handleImageChangeWhite}
                                            accept="image/*" />
                                        {error.logo_white &&
                                            <div className="invalid-feedback">{error.logo_white}</div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-danger">Update</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        );
    }
}

export default AdminBloodBankUpdate;