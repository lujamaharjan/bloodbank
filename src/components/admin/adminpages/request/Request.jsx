import React, { Component } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios';
import {Consumer} from '../../../../context'
import BASE_URL from '../../../../url'

class Request extends Component {

    changePage = async (page, dispatch) => {
        const newPageContentResponse = await axios.get(`${BASE_URL}/bloodrequest/?page=${page}`,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            })
        const newPageContent = newPageContentResponse.data.results;
        dispatch({ type: "CHANGE_SPONSOR", payload: newPageContent })
    }

    reject = async (dispatch, id) =>{
        console.log(id)
        const data = {
            is_viewed: true
        }
        await axios.patch(`${BASE_URL}/bloodrequest/${id}/`, data,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        dispatch({type: "UPDATE_REQUESTS", payload: id})
        toast.error("Request rejected", {position: toast.POSITION.BOTTOM_RIGHT})

    }

    accept = async (dispatch, id) =>{
        const data = {
            is_viewed: true
        }
        await axios.patch(`${BASE_URL}/bloodrequest/${id}/`, data);
        dispatch({type: "UPDATE_REQUESTS", payload: id})
        toast.success("Request accepted", {position: toast.POSITION.BOTTOM_RIGHT})
    }
    render() {
        return (
            
            <Consumer>
                {
                    value =>{
                        const {requests, dispatch} = value;
                        const { requestCount } = value;
                        const requestPerPage = 10;
                        const totalpages = Math.ceil(requestCount / requestPerPage)
                        const pageArr = [...Array(totalpages).keys()]
                        return(
                            <div className="container request">
                                <h4>New Blood Requests</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Hospital</th>
                                            <th>Blood Type</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            requests.map((request, index) =>{
                                                return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{request.hospital}</td>
                                                    <td>{request.blood_type}</td>
                                                    <td>{request.quantity} pkts</td>
                                                    <td>
                                                        <i onClick={this.reject.bind(this, dispatch, request.id)} className="fa fa-times text-danger"></i>
                                                        <i onClick={this.accept.bind(this, dispatch, request.id)} className="fa fa-check text-success"></i>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                      
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {
                                            pageArr.map(index => {
                                                return (
                                                    <li className="page-item" key={index}>
                                                        <button onClick={this.changePage.bind(this, index + 1, dispatch)} className="btn btn-light">{index + 1}</button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}



export default Request;
