import React, { Component } from 'react'
import avatar from '../../../layouts/images/Avatar_Panda-512.png'
import axios from 'axios';
import BASE_URL from '../../../../url';

export default class DonorDetails extends Component {
    state = {
        full_name:"",
        email:"", 
        address:"",
        contact_number:"",
        blood_group:"",
        gender:"",
        age:"",
        profile_picture: null,
    }
    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/donor-profile/${id}/`)
        let today = new Date().getFullYear()
        let bYear = res.data.DOB.split('-')
        const age = today - bYear[0]
        this.setState({
           full_name: res.data.full_name,
           email: res.data.email,
           address: res.data.address,
           contact_number: res.data.contact_number,
           blood_group: res.data.blood_group,
           gender:res.data.gender,
           age,
           profile_picture: res.data.profile_picture
        })
        
    }
    render() {
        const {full_name, email, address, contact_number, blood_group, gender, age, profile_picture} = this.state;
        return (
            <div className="container donor-detail">
                <div className="row">
                    <div className="col-md-5">
                        {
                            profile_picture !== null
                            ?(<img src={profile_picture} alt=""/>)
                            :(<img src={avatar} alt=""/>)
                        }
                        
                    </div>
                    <div className="col-md-7">
                        <h2>{full_name}</h2>
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
                            <td><b><i className="fa fa-tint"></i> blood Group</b></td>
                            <td>{blood_group}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-map-marker"></i> Address</b></td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-child"></i> Age</b></td>
                            <td>{age}</td>
                        </tr>
                        <tr>
                            <td><b> <i className="fa fa-venus-mars"></i> Gender</b></td>
                            <td>{gender}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
