import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import BASE_URL from '../../../../url'
import { Consumer } from '../../../../context';

class SponsorAdmin extends Component {
    state = {
        name: '',
        email: '',
        type: '',
        address: '',
        contact_number: '',
    }
    deleteSponsor = async (id, dispatch) => {
        if (window.confirm("Are you sure!")) {
            const res = await axios.delete(`${BASE_URL}/sponsor/${id}/`,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                }
                })
            dispatch({ type: "SPONSOR_DELETE", payload: id })

            if (res.status === 204)
                toast.success("Sponsor deleted sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
            else
                toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })
        }
    }
    changePage = async (page, dispatch) => {
        const newPageContentResponse = await axios.get(`${BASE_URL}/sponsor/?page=${page}`)
        const newPageContent = newPageContentResponse.data.results;
        dispatch({ type: "CHANGE_SPONSOR", payload: newPageContent })
    }
    render() {
        return (
            <Consumer>
                {
                    value => {
                        const { sponsors } = value;
                        const { sponsorCount } = value;
                        const sponsorPerPage = 10;
                        const totalpages = Math.ceil(sponsorCount / sponsorPerPage)
                        const pageArr = [...Array(totalpages).keys()]
                        const { dispatch } = value;
                        return (
                            <div className="container admin-donor">
                                <h4>Sponsor List <span><Link to="/bloodbank/dashboard/sponsor/add">+ Sponsor</Link></span></h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Sponsor Type</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sponsors.map((sponsor, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{sponsor.sponsor_name}</td>
                                                        <td>{sponsor.sponsor_email}</td>
                                                        <td>{sponsor.sponsor_address}</td>
                                                        <td>{sponsor.sponsor_type}</td>
                                                        <td>{sponsor.phone_number}</td>
                                                        <td className="text-center">
                                                            <Link to={`/bloodbank/dashboard/sponsor/detail/${sponsor.id}`}><i className="fa fa-eye text-success"></i></Link>
                                                            <Link to={`/bloodbank/dashboard/sponsor/update/${sponsor.id}`}><i className="fa fa-pencil text-primary"></i></Link>
                                                            <i onClick={this.deleteSponsor.bind(this, sponsor.id, dispatch)} className="fa fa-times text-danger"></i>
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
        );
    }
}

export default SponsorAdmin;

