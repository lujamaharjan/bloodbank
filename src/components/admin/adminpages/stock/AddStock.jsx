import React, { Component } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../../../url";
import {Consumer} from '../../../../context'
 
class AddStock extends Component {
    state = {
        blood_group: "O+",
        campaign: null,
        expiry_date: "",
        errors:{}
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        const { blood_group, campaign, expiry_date} = this.state;

        if(campaign === null) {
            this.setState({ errors: { campaign: "Campaign is Required" } });
            return;
        }
        if(expiry_date === "") {
            this.setState({ errors: { expiry_date: "expiry date is Required" } });
            return;
        }
        const newStock = {
            blood_type: blood_group,
            campaign: parseInt(campaign),
            expire_date: expiry_date,
        }
        console.log(newStock)
        const res = await axios.post(`${BASE_URL}/bloodpacket/`, newStock,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          });
        this.setState({
           blood_group:"O+",
           campaign:null,
           expiry_date:"",
           errors:{}
        })

        this.props.history.push("/bloodbank/dashboard/stock");
        if (res.status === 201)
            toast.success("Stock added successfully!!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        else
            toast.error("something went wrong", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        window.location.reload(false);
    }

    render() {
        const {blood_group, expiry_date, campaign, errors}  = this.state;
        return (
            <Consumer>
                {
                    value =>{
                        const {campaigns} = value;            
                        return(
                            <div className="container add-stock">
                                <h4>Add New Blood Packet</h4>
                                <form onSubmit={this.onFormSubmit}>
                            
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
                                                    return(
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
                                        <input type="date" className="form-control" name="expiry_date" value={expiry_date} onChange={this.onInputChange}/>
                                        {
                                            errors.expiry_date &&
                                                <p className="text-danger text-sm">{errors.expiry_date}</p>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-danger">Add Packet</button>
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
