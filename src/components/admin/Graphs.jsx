import React, { Component } from 'react'
import BarChart from './BarChart'
import axios from 'axios';
import BASE_URL from '../../url';
import {Consumer} from '../../context'
class Graphs extends Component {

    state = {
        new_donors: 0,
    }

    async componentDidMount(){
        let response = await axios.get(`${BASE_URL}/new_donors/`)
        this.setState({new_donors: response.data.new_donors})
    } 

    render() {
        return (
            <Consumer>
                {
                    value =>{
                        const {stockCount, requestCount} = value;
                        return(
                            <div className="dashboard-graphs">
                
                                <div className="container quick-info">
                                <h4>Dashboard</h4>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card bg-primary">
                                                <h5>{stockCount}</h5>
                                                <p><i className="fa fa-bar-chart"></i> Total Blood Stock</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card bg-success">
                                                <h5>{requestCount}</h5>
                                                <p><i className="fa fa-tint"></i> New Request</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card bg-danger">
                                            <h5>{this.state.new_donors}</h5>
                                                <p><i className="fa fa-user-plus"></i> New Donors</p>
                                            </div>
                                        </div>
                
                                    </div>
                                </div>
                
                                <div className="container bar">
                                    <BarChart blood_info={this.state.blood_info}/>
                                </div>
                            </div>
                        )
                    }
                }
            </Consumer>
           
        )
    }
}

export default Graphs;