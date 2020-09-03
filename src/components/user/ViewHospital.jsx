import React, { Component } from 'react';

import axios from 'axios';
import BASE_URL from '../../url';

import { UserContext } from '../../context/UserContext';
import { withRouter, Link } from 'react-router-dom';
import RequestBloodForm from '../layouts/RequestBloodForm';
import UserHistory from './UserHistory';

class ViewHospital extends Component {
  static contextType = UserContext;

  state = {
    selected: 0,
    selectedTab: 0,
    hospitalData: {},
  };

  componentDidMount = async () => {
    this.loadHospitalDetail();
  };

  loadHospitalDetail = async () => {
    const id = localStorage.getItem('userId');
    const hospitalDetails = await axios.get(
      `${BASE_URL}/hospital-profile/${id}`
    );
    localStorage.setItem('userDetails', JSON.stringify(hospitalDetails.data));
    this.setState({ hospitalData: hospitalDetails.data });
    this.context.setUserDetail(hospitalDetails.data);
  };

  EditDetail = async (event) => {
    const id = localStorage.getItem('userId');
    this.props.history.push(`/donor/edit/${id}`);
  };

  requestBlood = () => {
    this.setState({ selected: 1 });
  };

  cancel = () => {
    this.setState({ selected: 0 });
  };

  changeSelected = (e, id) => {
    e.preventDefault();
    this.setState({ selectedTab: id });
  };

  render() {
    const {
      hospital_name,
      email,
      contact_number,
      address,
    } = this.state.hospitalData;
    const { selectedTab } = this.state;

    return (
      <div>
        {this.state.selected === 1 && (
          <RequestBloodForm
            requestBlood={this.requestBlood}
            cancel={this.cancel}
          />
        )}
        {this.state.selected === 0 && (
          <div className='container mt-4'>
            <div className='text-center'>
              <h2 className='font-weight-bold'>Hospital detail</h2>
            </div>
            <div className='row mt-5 mb-5'>
              <div className='col-md-4'>
                <div className='profile-detail text-center'>
                  <input
                    type='submit'
                    className=' btn profile-edit-btn'
                    onClick={this.EditDetail}
                    name='btnEditProfile'
                    value='Edit Profile'
                  />
                </div>
                <div className='profile-detail text-center mt-2'>
                  <input
                    type='submit'
                    className=' btn profile-edit-btn'
                    onClick={this.requestBlood}
                    name='btnRequestBlood'
                    value='Request Blood'
                  />
                </div>
              </div>

              <div className='col-md-8'>
                <div className='profile-head'>
                  <ul className='nav nav-tabs' id='myTab' role='tablist'>
                    <li className='nav-item'>
                      <Link
                        className='nav-link active'
                        id='home-tab'
                        data-toggle='tab'
                        href='#home'
                        role='tab'
                        aria-controls='home'
                        aria-selected='true'
                        onClick={(e) => {
                          this.changeSelected(e, 0);
                        }}
                      >
                        Personal Detail
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link
                        className='nav-link'
                        id='profile-tab'
                        data-toggle='tab'
                        href='#profile'
                        role='tab'
                        aria-controls='profile'
                        aria-selected='false'
                        onClick={(e) => {
                          this.changeSelected(e, 1);
                        }}
                      >
                        History
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* TabView for Personal Detail and User history */}
                <div
                  className='tab-content profile-tab mt-5 set-font'
                  id='myTabContent'
                >
                  {selectedTab === 0 && (
                    <div className='  mt-5'>
                      <div className='text-center'>
                        <h3>{hospital_name}</h3>
                      </div>
                      <div className='row mt-5'>
                        <div className='col-md-6 col-6'>
                          <label>Email</label>
                        </div>
                        <div className='col-md-6 col-6'>
                          <p>{email}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-6'>
                          <label>Address</label>
                        </div>
                        <div className='col-md-6 col-6'>
                          <p>{address}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-6'>
                          <label>Phone</label>
                        </div>
                        <div className='col-md-6 col-6'>
                          <p>{contact_number}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedTab === 1 && <UserHistory />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ViewHospital);
