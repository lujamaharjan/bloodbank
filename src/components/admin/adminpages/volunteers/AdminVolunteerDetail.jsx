import React, { Component } from 'react';
import avatar from '../../../layouts/images/Avatar_Panda-512.png'
import axios from 'axios';
import BASE_URL from '../../../../url';

class AdminVolunteerDetail extends Component {
    state={
        name:'',
        address:'',
        mobile_number:'',
        role:'',
        campaign:'',
        profile_picture:null
    }
    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/volunteer/${id}/`);
        this.setState({
            name:res.data.volunteer_name,
            address:res.data.volunteer_address,
            mobile_number:res.data.volunteer_mobile_number,
            role:res.data.volunteer_role,
            campaign:res.data.register_for_campaign,
            profile_picture:res.data.volunteer_profile_pic

        })
    }
    render() {
        const {name,address,mobile_number,role,campaign,profile_picture}=this.state;
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
                    <h2>{name}</h2>
                    <p><i className="fa fa-map-marker"></i> {address}</p>
                </div>
               
            </div>
            <hr/>
            <h4>Volunteer Data</h4>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td><b><i className="fa fa-phone"></i> Phone</b></td>
                        <td>{mobile_number}</td>
                    </tr>
                    <tr>
                        <td><b>Role</b></td>
                        <td>{role}</td>
                    </tr>
                    <tr>
                        <td><b> Campaign</b></td>
                        <td>{campaign}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        );
    }
}

export default AdminVolunteerDetail;