import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../url'

class SponsorDetail extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        amount: '',
        type: 'personal',
        phone_number: '',
    }
    async   componentDidMount   (){
        const {id} = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/sponsor/${id}/`)
        const sponsor  = res.data
        this.setState({
            name : res.data.sponsor_name,
            email : res.data.sponsor_email,
            phone_number : res.data.phone_number,
            address : res.data.sponsor_address,
            amount : res.data.sponsor_amount,
            type:res.data.sponsor_type
        })
    }

    render() {
        const{name,address,email,phone_number,type,amount}=this.state;
        return (
            <div className="container donor-detail">
                <div className="row">
                    <div className="col-md-7">
                        <h2>{name}</h2>
                        <p><i className="fa fa-map-marker"></i> {address}</p>
                    </div>
                   
                </div>
                <hr/>
                <h4>Sponsor Data</h4>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td><b><i className="fa fa-envelope-o"></i> Email</b></td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-phone"></i> Phone</b></td>
                            <td>{phone_number}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-map-marker"></i> Address</b></td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-rupee"></i> Sponsor Amount</b></td>
                            <td>{amount}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-institution"></i> Sponsor Type</b></td>
                            <td>{type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SponsorDetail;