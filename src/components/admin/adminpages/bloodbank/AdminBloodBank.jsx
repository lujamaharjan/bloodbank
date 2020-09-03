import React, { Component } from 'react';
import { Consumer } from '../../../../context';
import {Link} from 'react-router-dom';
class AdminBloodBank extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { bloodbankinfo } = value;
                        return (
                            <div className="admin-slider">
                                <div className="container">
                                    <h4>Blood Bank Information</h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <td>SN</td>
                                                <td>Name</td>
                                                <td>Email Address</td>
                                                <td>Mobile Number</td>
                                                <td>Phone Number</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{bloodbankinfo.id}</td>
                                                <td>{bloodbankinfo.blood_bank_name}</td>
                                                <td>{bloodbankinfo.blood_bank_email}</td>
                                                <td>{bloodbankinfo.mobile_number}</td>
                                                <td>{bloodbankinfo.phone_number}</td>
                                                <td>
                                                <Link to={`/bloodbank/dashboard/bloodbank/update/${bloodbankinfo .id}`}><i className="fa fa-pencil"></i></Link>&nbsp;&nbsp;&nbsp;
                                                 <Link to ={`/bloodbank/dashboard/bloodbank/${bloodbankinfo .id}/details`}><button className='btn btn-primary'>Details</button></Link>   
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                }
            </Consumer>
        );
    }
}

export default AdminBloodBank;