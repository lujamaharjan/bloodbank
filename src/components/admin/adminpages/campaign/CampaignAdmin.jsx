import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import BASE_URL from '../../../../url'
import { Consumer } from '../../../../context';

class CampaignAdmin extends Component {
  deleteCampaign = async (id, dispatch) => {
    if (window.confirm("Are you sure!")) {
      const res = await axios.delete(`${BASE_URL}/campaign/${id}/`,{
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        }
        })
      dispatch({ type: "DELETE_CAMPAIGN", payload: id })

      if (res.status === 204)
        toast.success("Campaign deleted sucessfully!", { position: toast.POSITION.BOTTOM_RIGHT })
      else
        toast.error("Something went wrong", { position: toast.POSITION.BOTTOM_RIGHT })
    }
  }
  changePage = async (page, dispatch) => {
    const newPageContentResponse = await axios.get(`${BASE_URL}/campaign/?page=${page}`)
    const newPageContent = newPageContentResponse.data.results;
    dispatch({ type: "CHANGE_CAMPAIGN", payload: newPageContent })
  }

  render() {
    return (
      <Consumer>
        {
          value => {
            const { campaigns } = value;
            const { campaignCount } = value;
            const campaignPerPage = 10;
            const totalpages = Math.ceil(campaignCount / campaignPerPage)
            const pageArr = [...Array(totalpages).keys()]
            const { dispatch } = value;
            return (
              <div className="container admin-donor">
                <h4>Campaign List <span><Link to="/bloodbank/dashboard/campaign/add">+ Campaign</Link></span></h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Start DateTime</th>
                      <th>End DateTime</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      campaigns.map((campaign, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{campaign.campaign_name}</td>
                            <td>{campaign.campaign_location}</td>
                            <td>{campaign.campaign_start_date_time}</td>
                            <td>{campaign.campaign_end_date_time}</td>
                            <td className="text-center">
                              <Link to={`/bloodbank/dashboard/campaign/detail/${campaign.id}`}><i className="fa fa-eye text-success"></i></Link>
                              <Link to={`/bloodbank/dashboard/campaign/update/${campaign.id}`}><i className="fa fa-pencil text-primary"></i></Link>
                              <i onClick={this.deleteCampaign.bind(this, campaign.id, dispatch)} className="fa fa-times text-danger"></i>
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

export default CampaignAdmin;