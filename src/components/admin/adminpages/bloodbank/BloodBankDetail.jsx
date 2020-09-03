import React, { Component } from 'react';
import { Consumer } from '../../../../context';
class BloodBankDetail extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { bloodbankinfo, bloodbanksocialmediaurl } = value;
                        console.log(value)
                        return (
                            <div className="admin-slider" key={bloodbankinfo.id}>
                                <div className="container">
                                    <h4>Blood Bank Information</h4>
                                    <table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td>Name : </td>
                                                <td>&nbsp;</td>
                                                <td>{bloodbankinfo.blood_bank_name}</td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Email : </td>
                                                <td>&nbsp;</td>
                                                <td>{bloodbankinfo.blood_bank_email}</td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Address : </td>
                                                <td>&nbsp;</td>
                                                <td>{bloodbankinfo.blood_bank_address}</td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Phone Number : </td>
                                                <td>&nbsp;</td>
                                                <td>{bloodbankinfo.phone_number}</td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Mobile Number : </td>
                                                <td>&nbsp;</td>
                                                <td>{bloodbankinfo.mobile_number}</td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Logo Black: </td>
                                                <td>&nbsp;</td>
                                                <td><img src={bloodbankinfo.logo_black} /></td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Logo White: </td>
                                                <td>&nbsp;</td>
                                                <td><img src={bloodbankinfo.logo_white} /></td>
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Facebook URL : </td>
                                                <td>&nbsp;</td>
                                                <td><a href={bloodbanksocialmediaurl.facebook_url}>{bloodbanksocialmediaurl.facebook_url}</a></td>
                                                
                                            </tr>
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <td>Instagram URL : </td>
                                                <td>&nbsp;</td>
                                                <td><a href={bloodbanksocialmediaurl.instagram_url}>{bloodbanksocialmediaurl.instagram_url}</a></td>
                                                
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

export default BloodBankDetail;