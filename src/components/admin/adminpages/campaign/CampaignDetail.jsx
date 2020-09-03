import React, { Component } from 'react';
import avatar from '../../../layouts/images/Avatar_Panda-512.png'
import axios from 'axios';
import BASE_URL from '../../../../url';

class CampaignDetail extends Component {
    state = {
        name: '',
        location: '',
        start_date_time: '',
        end_date_time: '',
        host_name: '',
        sponsor: [],
        donor: [],
        campaign_image: null,
        about_campaign: '',
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/campaign/${id}/`)
        console.log("res",res)
        this.setState({
            name: res.data.campaign_name,
            location: res.data.campaign_location,
            start_date_time: res.data.campaign_start_date_time,
            end_date_time: res.data.campaign_end_date_time,
            host_name: res.data.campaign_host_name,
            sponsor: res.data.sponsor,
            donor: res.data.donors,
            campaign_image: res.data.campaign_image,
            about_campaign: res.data.about_campaign
        })

    }
    render() {
        const { name, location, start_date_time, end_date_time, host_name, sponsor, donor, campaign_image, about_campaign } = this.state;
        console.log("sponsor",sponsor)
        return (
            <div className="container donor-detail">
                <div className="row">
                    <div className="col-md-5">
                        {
                            campaign_image !== null
                                ? (<img src={campaign_image} alt="" />)
                                : (<img src={avatar} alt="" />)
                        }

                    </div>
                    <div className="col-md-7">
                        <h2>{name}</h2>
                        <p><i className="fa fa-map-marker"></i> {location}</p>
                    </div>

                </div>
                <hr />
                <h4>Campaign Data</h4>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td><b><i className="fa fa-clock-o"></i> Start Date Time</b></td>
                            <td>{start_date_time}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-clock-o"></i> End Date Time</b></td>
                            <td>{end_date_time}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-user-o"></i> Host Name</b></td>
                            <td>{host_name}</td>
                        </tr>
                        <tr>
                            <td><b><i className="fa fa-users"></i> sponsors</b></td>
                            {
                                sponsor.map((data) => (
                                    <td key={data.id}>{data}</td>
                                ))
                            }

                        </tr>
                        <tr>
                            <td><b><i className="fa fa-child"></i> Donors</b></td>
                            {
                                donor.map((data) => (
                                    <td key={data.id}>{donor}</td>
                                ))
                            }

                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default CampaignDetail;