import React, { Component } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../../../url";
import { Consumer } from '../../../../context'

class AddStock extends Component {
    state = {
        blood_group: "O+",
        campaign: null,
        expiry_date: "",
        errors: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/bloodpacket/${id}/`,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        const stock = response.data;
        this.setState({
            blood_group: stock.blood_type,
            campaign: stock.campaign,
            expiry_date: stock.expire_date
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onFormSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { blood_group, campaign, expiry_date } = this.state;

        if (campaign === null) {
            this.setState({ errors: { campaign: "Campaign is Required" } });
            return;
        }
        if (expiry_date === "") {
            this.setState({ errors: { expiry_date: "expiry date is Required" } });
            return;
        }
        const newStock = {
            blood_type: blood_group,
            campaign: parseInt(campaign),
            expire_date: expiry_date,
        }
        const { id } = this.props.match.params;
        const res = await axios.put(`${BASE_URL}/bloodpacket/${id}/`, newStock);
        dispatch({ type: "UPDATE_STOCK", payload: res.data })
        this.setState({
            blood_group: "O+",
            campaign: null,
            expiry_date: "",
            errors: {}
        })


        this.props.history.push("/bloodbank/dashboard/stock");
        if (res.status === 200)
            toast.success("Sponsor added successfully!!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        else
            toast.error("something went wrong", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })

    }

    render() {
        const { blood_group, expiry_date, campaign, errors } = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const { campaigns } = value;
                        const { dispatch } = value;
                        return (
                            <div className="container add-stock">
                                <h4>Update Blood Packet</h4>
                                <form onSubmit={this.onFormSubmit.bind(this, dispatch)}>

                                    <div className="form-group">
                                        <label htmlFor="blood_group">Blood Group</label>
                                        <select name="blood_group" className="form-control" value={blood_group} onChange={this.onInputChange}>
                                            <option value='O+'>O-Positive</option>
                                            <option value='O-'>O-Negative</option>
                                            <option value='A+'>A-Positive</option>
                                            <option value='A-'>A-Negative</option>
                                            <option value='B+'>B-Positive</option>
                                            <option value='B-'>B-Negative</option>
                                            <option value='AB+'>AB-Positive</option>
                                            <option value='AB-'>AB-Negative</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="campaign">Campagin</label>
                                        <select name="campaign" className="form-control" value={campaign} onChange={this.onInputChange}>

                                            {
                                                campaigns.map(item => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.campaign_name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        {
                                            errors.campaign &&
                                            <p className="text-danger text-sm">{errors.campaign}</p>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expiry_date">Expiry Date</label>
                                        <input type="date" className="form-control" name="expiry_date" value={expiry_date} onChange={this.onInputChange} />
                                        {
                                            errors.expiry_date &&
                                            <p className="text-danger text-sm">{errors.expiry_date}</p>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-danger">Update Packet</button>
                                </form>
                            </div>
                        )
                    }
                }

            </Consumer>

        )
    }
}

export default AddStock;
