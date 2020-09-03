import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../../url'
import {Bar} from 'react-chartjs-2';

class BarChart extends Component {
    state = {
            
    }



    async componentDidMount(){
        let response = await axios.get(`${BASE_URL}/blood_stock_info/`)
        let arr = [
                    response.data.a_positive,
                    response.data.a_negative,
                    response.data.b_positive,
                    response.data.b_negative,
                    response.data.ab_positive,
                    response.data.ab_negative,
                    response.data.o_positive,
                    response.data.o_negative,

                ]
        this.setState({
            chartData:{
                labels: ['A+', 'A-', 'B+', 'B-', 'AB+','AB-', 'O+', 'O-'],
                datasets:[
                    {
                    label: 'Blood Group',
                    data: arr,
                    backgroundColor: '#8c0032',
                    }
            ]
        }})
    } 

    render() {
        return (
            <div>
                <>
                    <Bar
                        data={this.state.chartData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio:true,
                            title:{
                                display:true,
                                text: "Blood stock Available",
                                fontSize: 25,
                            },
                            legend:{
                                display: true,
                                position: 'top'
                            }
                        }}
                    />
                </>
            </div>
        )
    }
}
export default BarChart;