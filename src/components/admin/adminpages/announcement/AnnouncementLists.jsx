import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

import BASE_URL from '../../../../url';
import { Consumer } from '../../../../context';

 class AnnouncementLists extends Component {

    deleteAnnoumcement = async (id, dispatch) =>{
        if(window.confirm("Are you sure!"))
        {
            const res = await axios.delete(`${BASE_URL}/announcement/${id}/`,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                },
              })

            dispatch({type: "ANNOUNCEMENT_DELETE", payload:id})

            if(res.status === 204)
                toast.success("Donor deleted sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
            else
                toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
        }  
    }

    changePage = async(page, dispatch) =>{
        const newPageContentResponse = await axios.get(`${BASE_URL}/announcement/?page=${page}`)
        const newPageContent = newPageContentResponse.data.results;
        dispatch({type: "CHANGE_ANNOUNCEMENT", payload: newPageContent})
    }

    render() {
        return (
            <Consumer>
                {
                    value =>{
                        const {announcementCount} = value;
                        const announcementPerPage = 10;
                        const totalpages = Math.ceil(announcementCount/ announcementPerPage)
                        const pageArr = [...Array(totalpages).keys()]
                        const {announcements,dispatch} = value;
                        return(
                            <div className="container announcement-lists">
                                <h4>Announcment Lists <span><Link to="/bloodbank/dashboard/announcements/add"> + Annoumcement </Link></span></h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Title</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            announcements.map((item, index) => {
                                                return(
                                                    <tr key={item.id}>
                                                        <td>{index}</td>
                                                        <td>{item.title}</td>
                                                        <td>
                                                            <Link to={`/bloodbank/dashboard/announcements/details/${item.id}`}>
                                                                <i className="fa fa-eye text-success"></i>
                                                            </Link> 
                                                            <Link to={`/bloodbank/dashboard/announcements/edit/${item.id}`}>
                                                                <i className="fa fa-pencil text-primary"></i>
                                                            </Link>
                                                            <i onClick={this.deleteAnnoumcement.bind(this, item.id, dispatch)} className="fa fa-times text-danger"></i>
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

export default AnnouncementLists;
