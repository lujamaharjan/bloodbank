import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import {Consumer} from '../../../../context'


class AdminSlider extends Component {
    render() {
        return (
            <Consumer>
                {
                    value =>{
                        const {carousel} = value;

                        return(
                            <div className="admin-slider">
                            <div className="container">
                                <h4>Slider</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td>SN</td>
                                            <td>Title</td>
                                            <td>Quotes</td>
                                            <td>Image</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            carousel.map((item,index) =>{
                                                return(
                                                    <tr key={item.id}>
                                                        <td>{index}</td>
                                                        <td>{item.title}</td>
                                                        <td>
                                                            {item.quote}
                                                        </td>
                                                        <td>
                                                            <img src={item.image} alt=""/>
                                                        </td>
                                                        <td>
                                                            <Link to={`/bloodbank/dashboard/slider/update/${item.id}`}><i className="fa fa-pencil"></i></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        )
                    }
                }
            </Consumer>
           
        )
    }
}
export default AdminSlider;