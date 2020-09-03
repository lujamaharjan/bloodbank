import React, { Component } from 'react';
import { Consumer } from '../../../../context';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import BASE_URL from '../../../../url';

class AdminVolunteers extends Component {
    //deleting Volunteer data
    deleteVolunteer = async (id, dispatch) => {
        if (window.confirm("Are you sure!")) {
            const res = await axios.delete(`${BASE_URL}/volunteer/${id}/`,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                }
                })
            dispatch({ type: "DELETE_VOLUNTEER", payload: id })

            if (res.status === 204)
                toast.success("Volunteer Information delete sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
            else
                toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })
        }
    }


    //change the Volunteer items on clicking pagination buttons
    changePage = async (page, dispatch) => {
        const newPageContentResponse = await axios.get(`${BASE_URL}/volunteer/?page=${page}`)
        const newPageContent = newPageContentResponse.data.results;
        dispatch({ type: "CHANGE_VOLUNTEER", payload: newPageContent })
    }

    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { dispatch } = value;
                        const { volunteers } = value;
                        const { volunteerCount } = value;
                        const volunteerPerPage = 3;
                        const totalpages = Math.ceil(volunteerCount / volunteerPerPage)
                        const pageArr = [...Array(totalpages).keys()]
                        return (
                            <div className="container admin-donor">
                                <h4>Volunteers List <span><Link to={'/bloodbank/dashboard/volunteer/add'}>+ Volunteer</Link></span></h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <td>SN</td>
                                                <td>Name</td>
                                                <td>Address</td>
                                                <td>Mobile Number</td>
                                                <td>Role</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                volunteers.map((volunteer, index) => (
                                                    <tr key={volunteer.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{volunteer.volunteer_name}</td>
                                                        <td>{volunteer.volunteer_address}</td>
                                                        <td>{volunteer.volunteer_mobile_number}</td>
                                                        <td>{volunteer.volunteer_role}</td>
                                                        <td>
                                                        <Link to={`/bloodbank/dashboard/volunteer/update/${volunteer.id}`}><i className="fa fa-pencil"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <Link to={`/bloodbank/dashboard/volunteer/detail/${volunteer.id}`}><i className="fa fa-eye text-success"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <i className="fa fa-times" onClick={this.deleteVolunteer.bind(this, volunteer.id, dispatch)}></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </td>
                                                    </tr>


                                                ))
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

export default AdminVolunteers;