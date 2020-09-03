import React, { Component } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Link} from "react-router-dom"
import BASE_URL from '../../../../url'
import { Consumer } from '../../../../context';

class Stock extends Component {

    deleteStock = async (id, dispatch) => {
        if (window.confirm("Are you sure!")) {
            const res = await axios.delete(`${BASE_URL}/bloodpacket/${id}/`,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                }
                })
            dispatch({ type: "STOCK_DELETE", payload: id })

            if (res.status === 204)
                toast.success("Blood Packet deleted sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
            else
                toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })
        }
    }

    changePage = async(page, dispatch) =>{
        const newPageContentResponse = await axios.get(`${BASE_URL}/bloodpacket/?page=${page}`)
        const newPageContent = newPageContentResponse.data.results;
        dispatch({type: "CHANGE_STOCKS", payload: newPageContent})
    }

    render() {
        return (
            <Consumer>
                {value =>{
                    const {stocks, dispatch} = value;
                    const {stockCount} = value;
                    const stockPerPage = 10;
                    const totalpages = Math.ceil(stockCount/ stockPerPage)
                    const pageArr = [...Array(totalpages).keys()]
                    
                    return(
                        <div className="container stock">
                        <h4>Blood Packets Lists<Link to="/bloodbank/dashboard/stock/add"><span>+ Add Packet</span></Link></h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>BloodType</th>
                                    <th>Expiry Date</th>
                                    <th>Campain</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stocks.map((stock, index) =>{
                                        return(
                                        <tr key={index}>
                                            <td>{index+ 1}</td>
                                            <td>{stock.blood_type}</td>
                                            <td>{stock.expire_date}</td>
                                            <td>{stock.campaign}</td>
                                            <td>
                                                <Link to={`/bloodbank/dashboard/stock/update/${stock.id}`}><i className="fa fa-pencil text-primary"></i></Link>
                                                <i onClick={this.deleteStock.bind(this, stock.id, dispatch)} className="fa fa-times-circle text-danger"></i>
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
                                                    return(
                                                        <li className="page-item" key={index}>
                                                            <button onClick={this.changePage.bind(this,index+1, dispatch)} className="btn btn-light">{index+1}</button>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </nav>
                    </div>
                    )
                }}
                
            </Consumer>
        )
    }
}
export default Stock;
