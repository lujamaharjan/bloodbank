import React, { Component } from 'react'
import axios from 'axios';
import BASE_URL from '../../../../url'

class DetailHospital extends Component {
    state = {
        hospital_name : "",
        email : "",
        contact_number : "",
        address : ""
    }

    
    async   componentDidMount   (){
        const {id} = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/hospital-profile/${id}/`)
        const hospital  = res.data
        console.log(hospital)
        this.setState({
            hospital_name : res.data.hospital_name,
            email : res.data.email,
            contact_number : res.data.contact_number,
            address : res.data.address,
        })
    }



    render() {
        const {hospital_name, email, contact_number , address} = this.state;

        return (
            <div className="container donor-detail">
                <div className="row">
                    <div className="col-md-7">
                        <h2>{hospital_name}</h2>
                        <p><i className="fa fa-map-marker"></i> {address}</p>
                    </div>
                   
                </div>
                <hr/>
                <h4>Donor Data</h4>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td><b><i className="fa fa-envelope-o"></i> Email</b></td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-phone"></i> Phone</b></td>
                            <td>{contact_number}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-map-marker"></i> Address</b></td>
                            <td>{address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default DetailHospital;