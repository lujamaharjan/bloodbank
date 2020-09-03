import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

import BASE_URL from '../../../../url'
import { Consumer } from '../../../../context';


 class AdminDonors extends Component {

    deleteDonor = async (id, dispatch) =>{
        if(window.confirm("Are you sure!"))
        {
            const res = await axios.delete(`${BASE_URL}/donor-profile/${id}/`,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                }
                })
            dispatch({type: "DONOR_DELETE", payload:id})

            if(res.status === 204)
                toast.success("Donor deleted sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
            else
                toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
        }  
    }


    changePage = async(page, dispatch) =>{
        const newPageContentResponse = await axios.get(`${BASE_URL}/donor-profile/?page=${page}`)
        const newPageContent = newPageContentResponse.data.results;
        dispatch({type: "CHANGE_DONOR", payload: newPageContent})
    }

    render() {
        return(
            <Consumer>
            {
                value =>{
                    const {donors} = value;
                    const {donorCount} = value;
                    const donorPerPage = 10;
                    const totalpages = Math.ceil(donorCount / donorPerPage)
                    const pageArr = [...Array(totalpages).keys()]
                    const {dispatch} = value;
                    return(
                        <div className="container admin-donor">
                            <h4>Donor List <span><Link to="/bloodbank/dashboard/donors/add">+ Donor</Link></span></h4>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Blood</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        donors.map((donor,index) =>{
                                            return(
                                                <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{donor.full_name}</td>
                                                <td>{donor.contact_number}</td>
                                                <td>{donor.blood_group}</td>
                                                <td className="text-center">
                                                    <Link to={`/bloodbank/dashboard/donors/details/${donor.id}`}><i className="fa fa-eye text-success"></i></Link>
                                                    <Link to={`/bloodbank/dashboard/donors/update/${donor.id}`}><i className="fa fa-pencil text-primary"></i></Link>
                                                    <i onClick={this.deleteDonor.bind(this, donor.id, dispatch)} className="fa fa-times text-danger"></i>
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
                }
            }
        </Consumer>
        )
    }
}

export default AdminDonors;
