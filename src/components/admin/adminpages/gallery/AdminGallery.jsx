import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Consumer} from '../../../../context'

import BASE_URL from '../../../../url'


class AdminGallery extends Component {

    //deleting gallery items
    deleteGallery = async (id, dispatch) =>{
        if(window.confirm("Are you sure!"))
        {
            const res = await axios.delete(`${BASE_URL}/gallery/${id}/`,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                },
              })

            dispatch({type: "DELETE_GALLERY", payload:id})

            if(res.status === 204)
                toast.success("Gallery image delete sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
            else
                toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
        }  
    }


    //change the gallery items on clicking pagination buttons
    changePage = async(page, dispatch) =>{
        const newPageContentResponse = await axios.get(`${BASE_URL}/gallery/?page=${page}`)
        const newPageContent = newPageContentResponse.data.results;
        dispatch({type: "CHANGE_GALLERY", payload: newPageContent})
    }
    render() {
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;
                        const {gallery} = value;
                        const {galleryCount} = value;
                        const galleryPerPage = 3;
                        const totalpages = Math.ceil(galleryCount / galleryPerPage)
                        const pageArr = [...Array(totalpages).keys()] 
                        return(
                            <div className="admin-gallery">
                                <div className="container">
                                    <h4> Gallery <Link to="/bloodbank/dashboard/gallery/add">
                                        <span><i className="fa fa-plus"></i> Image</span></Link>
                                    </h4>
                                        
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                            gallery.map( gallerydata => {
                                                   return(
                                                    <tr key={gallerydata.id}>
                                                        <td>
                                                            <img src={gallerydata.image} alt=""/>
                                                        </td>
                                                        <td>
                                                            <Link to={`/bloodbank/dashboard/gallery/update/${gallerydata.id}`}><i className="fa fa-pencil"></i></Link>
                                                            <i onClick={this.deleteGallery.bind(this, gallerydata.id, dispatch)} className="fa fa-times"></i>
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
                            </div>
                        )
                       
                    }
                }
            </Consumer>
            
        )
    }
}

export default AdminGallery;
