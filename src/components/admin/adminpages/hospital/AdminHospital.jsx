import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import BASE_URL from '../../../../url'
import { Consumer } from '../../../../context';

class AdminHospital extends Component {
  state = {
    hospital_name: '',
    address: '',
    email: '',
    contact_number: ''
  }
  deleteHospital = async (id, dispatch) => {
    if (window.confirm("Are you sure!")) {
      const res = await axios.delete(`${BASE_URL}/hospital-profile/${id}/`,{
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        }
        })
      dispatch({ type: "DELETE_HOSPITAL", payload: id })

      if (res.status === 204)
        toast.success("Hospital deleted sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
      else
        toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })
      window.location.reload(false)
    }
  }
  changePage = async (page, dispatch) => {
    const newPageContentResponse = await axios.get(`${BASE_URL}/hospital-profile/?page=${page}`)
    const newPageContent = newPageContentResponse.data.results;
    dispatch({ type: "CHANGE_HOSPITAL", payload: newPageContent })
  }

  render() {
    return (
      <Consumer>
        {
          value => {
            const { hospitals } = value;
            const { hospitalCount } = value;
            const hospitalPerPage = 10;
            const totalpages = Math.ceil(hospitalCount / hospitalPerPage)
            const pageArr = [...Array(totalpages).keys()]
            const { dispatch } = value;
            return (
              <div className="container admin-donor">
                <h4>Hospital List <span><Link to="/bloodbank/dashboard/hospital/add">+ Hospital</Link></span></h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      hospitals.map((hospital, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{hospital.hospital_name}</td>
                            <td>{hospital.email}</td>
                            <td>{hospital.address}</td>
                            <td>{hospital.contact_number}</td>
                            <td className="text-center">
                              <Link to={`/bloodbank/dashboard/hospital/detail/${hospital.id}`}><i className="fa fa-eye text-success"></i></Link>
                              <Link to={`/bloodbank/dashboard/hospital/update/${hospital.id}`}><i className="fa fa-pencil text-primary"></i></Link>
                              <i onClick={this.deleteHospital.bind(this, hospital.id, dispatch)} className="fa fa-times text-danger"></i>
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

export default AdminHospital;