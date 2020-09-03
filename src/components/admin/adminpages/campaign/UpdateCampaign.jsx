import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import CKEditor from 'ckeditor4-react';
import classnames from 'classnames';
import { Consumer } from '../../../../context'
import BASE_URL from '../../../../url'


class UpdateCampaign extends Component {
    state = {
        campaign_name: '',
        campaign_location: '',
        campaign_start_date_time: '',
        campaign_end_date_time: '',
        campaign_host_name: '',
        about_campaign: '',
        campaign_image: null,
        donor: [],
        sponsor: [],
        errors: {}
    }
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    onChangeImage = (event) => {
        this.setState({ campaign_image: event.target.files[0] })
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/campaign/${id}/`);
        const campaign = response.data;
        this.setState({
            campaign_name: campaign.campaign_name,
            campaign_location: campaign.campaign_location,
            campaign_start_date_time: campaign.campaign_start_date_time,
            campaign_end_date_time: campaign.campaign_end_date_time,
            campaign_host_name: campaign.campaign_host_name,
            about_campaign: campaign.about_campaign,
            donor: campaign.donors,
            sponsor: campaign.sponsor,
            campaign_image: campaign.campaign_image
        })
    }

    handleSubmit = async (dispatch, e) => {
        const { campaign_name, campaign_location, campaign_start_date_time, campaign_end_date_time, campaign_host_name, about_campaign, donor, sponsor, campaign_image } = this.state;
        e.preventDefault();
        if (campaign_name === "") {
            this.setState({ errors: { campaign_name: "Name is required!" } })
        }
        if (campaign_location === "") {
            this.setState({ errors: { campaign_location: "Location is Required!" } })
            return;
        }
        if (campaign_start_date_time === '') {
            this.setState({ errors: { campaign_start_date_time: "Start Date Time is Required!" } })
            return;
        }
        if (campaign_end_date_time === "") {
            this.setState({ errors: { campaign_end_date_time: "End Date Time is required!" } })
        }
        if (campaign_host_name === "") {
            this.setState({ errors: { campaign_host_name: "Campaign Host Name is Required!" } })
            return;
        }
        if (sponsor === "") {
            this.setState({ errors: { sponsor: "Sponsor is Required!" } })
            return;
        }
        if (donor === "") {
            this.setState({ errors: { donor: "Donor is Required!" } })
            return;
        }
        if (about_campaign === "") {
            this.setState({ errors: { about_campaign: "Campaign Description is Required!" } })
            return;
        }
        if (campaign_image === '') {
            this.setState({ errors: { campaign_image: "Image is Required!" } })
            return;
        }
        const { id } = this.props.match.params
        const formData = new FormData();
        formData.append("campaign_name", campaign_name);
        formData.append("campaign_location", campaign_location);
        formData.append("campaign_start_date_time", campaign_start_date_time);
        formData.append("campaign_end_date_time", campaign_end_date_time);
        formData.append("campaign_host_name", campaign_host_name);
        formData.append("sponsor", sponsor);
        formData.append("donors", donor);
        formData.append("about_campaign", about_campaign);
        if (campaign_image !== null)
            formData.append("campaign_image", campaign_image, campaign_image.name);
        const res = await axios.put(`${BASE_URL}/campaign/${id}/`, formData,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        dispatch({ type: "UPDATE_CAMPAIGN", payload: res.data })
        this.setState({
            campaign_name: '',
            campaign_location: '',
            campaign_start_date_time: '',
            campaign_end_date_time: '',
            campaign_host_name: '',
            about_campaign: '',
            campaign_image: null,
            donor: [],
            sponsor: [],
            errors: {}

        })
        this.props.history.push('/bloodbank/dashboard/campaign')
        if (res.status === 200)
            toast.success("Campaign update sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
        else
            toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })
    }

    render() {
        const { campaign_name, campaign_location, campaign_start_date_time, campaign_end_date_time, campaign_host_name, about_campaign, donor, sponsor, errors } = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const { donors, sponsors } = value;
                        const { dispatch } = value;
                        return (
                            <div className="container add-donor">

                                <form className="col-md-8 mx-auto" onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                    <h4>Update Campaign</h4>
                                    <div className="form-group">
                                        <label htmlFor="title">Campaign Name</label>
                                        <input type="text"
                                            className={classnames('form-control', { 'is-invalid': errors.campaign_name })}
                                            name="campaign_name"
                                            value={campaign_name}
                                            onChange={this.onInputChange} />
                                        {errors.campaign_name &&
                                            <div className="invalid-feedback">{errors.campaign_name}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Campaign Location</label>
                                        <input type="text"
                                            className={classnames('form-control', { 'is-invalid': errors.campaign_location })}
                                            name="campaign_location"
                                            value={campaign_location}
                                            onChange={this.onInputChange} />
                                        {errors.campaign_location &&
                                            <div className="invalid-feedback">{errors.campaign_location}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Start Date Time</label>
                                        <input type="datetime-local"
                                            className={classnames('form-control', { 'is-invalid': errors.campaign_start_date_time })}
                                            name="campaign_start_date_time"
                                            value={campaign_start_date_time}
                                            onChange={this.onInputChange} />
                                        {errors.campaign_start_date_time &&
                                            <div className="invalid-feedback">{errors.campaign_start_date_time}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">End Date Time</label>
                                        <input type="datetime-local"
                                            className={classnames('form-control', { 'is-invalid': errors.campaign_end_date_time })}
                                            name="campaign_end_date_time"
                                            value={campaign_end_date_time}
                                            onChange={this.onInputChange} />
                                        {errors.end_date_time &&
                                            <div className="invalid-feedback">{errors.campaign_end_date_time}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Host Name</label>
                                        <input type="text"
                                            className={classnames('form-control', { 'is-invalid': errors.host_name })}
                                            name="host_name"
                                            value={campaign_host_name}
                                            onChange={this.onInputChange} />
                                        {errors.campaign_host_name &&
                                            <div className="invalid-feedback">{errors.campaign_host_name}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Donors</label>
                                        <select multiple className={classnames('form-control', { 'is-invalid': errors.donor })} name='donor' value={donor} onChange={this.onInputChange}>
                                            {
                                                donors.map((donor) => (
                                                    <option key={donor.id} value={donor.id}>{donor.email}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.donor &&
                                            <div className="invalid-feedback">{errors.donor}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Sponsors</label>
                                        <select multiple className={classnames('form-control', { 'is-invalid': errors.sponsor })} name='sponsor' value={sponsor} onChange={this.onInputChange}>
                                            {
                                                sponsors.map((sponsor) => (
                                                    <option key={sponsor.id} value={sponsor.id}>{sponsor.sponsor_name}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.sponsors &&
                                            <div className="invalid-feedback">{errors.sponsors}</div>
                                        }
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="body">About Campaign</label>
                                        <CKEditor
                                            data={about_campaign}
                                            onChange={this.onEditorChange}
                                        />
                                        {errors.about_campaign &&
                                            <div style={{ fontSize: '13px', color: "red" }}>{errors.about_campaign}</div>
                                        }
                                    </div>
                                    <div className='form-group' style={{ margin: "30px 0" }}>
                                        <label htmlFor='feature_image'>Campaign Image</label>
                                        <input
                                            type='file'
                                            className='form-control-file'
                                            accept="image/*"
                                            onChange={this.onChangeImage} />
                                        {errors.campaign_image &&
                                            <div style={{ fontSize: '13px', color: "red" }}>{errors.campaign_image}</div>
                                        }
                                    </div>
                                    <button className="btn btn-danger mb-4" type="submit">Update Campaign</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        );
    }
}

export default UpdateCampaign;