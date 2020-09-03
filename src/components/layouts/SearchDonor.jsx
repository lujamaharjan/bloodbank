import React, { Component } from 'react'
import axios from 'axios';
import BASE_URL from '../../url';
import imge from '../layouts/images/blog1.png'

class SearchDonor extends Component {

    state={
        address:"",
        blood_group:"O+",
        donors: [],
        showdonor: false
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const {blood_group, address} = this.state;
        if(address == ""){
            alert("Address is required!")
            return;
        }
        const newSearchData ={
            address,
            blood_group
        }
        const response = await axios.post(`${BASE_URL}/filter_donor/`, newSearchData);
        this.setState({donors: response.data.Donors});
        console.log(this.state.donors)
        console.log(typeof(this.state.donors))
        this.setState({showdonor: true})

    }

    render() {
        return (
            <div className="donor-search">
                <h4>Search Donors Near you!</h4>
                <form className = "form-inline" role="form" onSubmit={this.handleSubmit}>
                    <div className = "form-group">
                        <input type = "text" 
                        className = "form-control" 
                        name="address" 
                        placeholder = "Address" 
                        onChange={this.onInputChange}
                        value={this.state.address}/>
                    </div>
                    <div className="form-group">
                        <select 
                            className="form-control"  
                            name='blood_group'
                            onChange={this.onInputChange} 
                            value={this.state.blood_group}
                             >
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
              
                    <button type="submit" className="btn">Submit</button>
                </form>
                {
                    this.state.showdonor &&
                    (
                        <div className="donor-lists">
                            <div class="row">
                                {
                                    this.state.donors.map(donor => {
                                        return(
                                            <div class="col-md-4>">
                                                <div class="card">
                                                    {
                                                        !donor.profile_picture && (
                                                            <img alt="" src={imge}/>
                                                        )
                                                    }
                                                    <img alt="" src={`${BASE_URL}/media/${donor.profile_picture}`}/>
                                                    <h5>{donor.full_name}</h5>
                                                    <p>{donor.contact_number}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                               
                            </div>
                        </div>
                    )
                }


            </div>
        )
    }
}

export default SearchDonor;
