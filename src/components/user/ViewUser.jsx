import React, { Component } from 'react';

import axios from 'axios';
import BASE_URL from '../../url';

import { UserContext } from '../../context/UserContext';
import { withRouter, Link } from 'react-router-dom';
import UserHistory from './UserHistory';

class ViewUser extends Component {
  static contextType = UserContext;

  state = {
    donorData: {},
    profile_picture: '',
    selected: 0,
  };

  componentDidMount = async () => {
    this.loadDetails();
  };
  // function to load user Details and set user detail in user context
  loadDetails = async () => {
    const id = localStorage.getItem('userId');
    const donorDetails = await axios.get(`${BASE_URL}/donor-profile/${id}`);
    localStorage.setItem('userDetails', JSON.stringify(donorDetails.data));
    this.setState({ donorData: donorDetails.data });
    this.context.setUserDetail(donorDetails.data);
  };

  EditDetail = async (event) => {
    const id = localStorage.getItem('userId');
    this.props.history.push(`/donor/edit/${id}`);
  };

  ChangeProfilePic = async (event) => {
    let formData = new FormData();
    formData.append('profile_picture', event.target.files[0]);
    axios
      .patch(
        `${BASE_URL}/donor-profile/${this.context.value.state.id}/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      .then(() => {
        alert('success');
        this.loadDetails();
      })
      .catch((error) => {
        alert('error');
      });
  };

  changeSelected = (e, id) => {
    e.preventDefault();
    this.setState({ selected: id });
  };

  render() {
    const { selected } = this.state;
    return (
      <div className='container mt-4'>
        <form action=''>
          <div className='row '>
            {/* Profile Image Section */}
            <div className='col-md-4'>
              <div className='profile-img'>
                <img
                  src={this.state.donorData.profile_picture}
                  alt='profileImage'
                />
                <div className='file btn btn-lg btn-primary'>
                  Change Photo
                  <input
                    type='file'
                    accept='image/*'
                    name='file'
                    onChange={this.ChangeProfilePic}
                  />
                </div>
              </div>
            </div>

            {/* User Detail Section */}
            <div className='col-md-8'>
              <div className='profile-head'>
                <ul className='nav nav-tabs set-font' id='myTab' role='tablist'>
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
                {selected === 0 && (
                  <div
                    className='tab-pane fade show active'
                    id='home'
                    role='tabpanel'
                    aria-labelledby='home-tab'
                  >
                    <div className='row'>
                      <div className='col-md-6 col-6'>
                        <label>Full Name</label>
                      </div>
                      <div className='col-md-6 col-6'>
                        <p>{this.state.donorData.full_name}</p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6 col-6'>
                        <label>Email</label>
                      </div>
                      <div className='col-md-6 col-6'>
                        <p>{this.state.donorData.email}</p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6 col-6'>
                        <label>Address</label>
                      </div>
                      <div className='col-md-6 col-6'>
                        <p>{this.state.donorData.address}</p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6 col-6'>
                        <label>Phone</label>
                      </div>
                      <div className='col-md-6 col-6'>
                        <p>{this.state.donorData.contact_number}</p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6 col-6'>
                        <label>Date of Birth </label>
                      </div>
                      <div className='col-md-6 col-6'>
                        <p>{this.state.donorData.DOB}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* End of Personal Detail Section */}

                {/* Start of user History Section */}
                {selected === 1 && <UserHistory />}
              </div>
            </div>
          </div>

          {/* Edit Button Section */}
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-detail text-center'>
                <input
                  type='submit'
                  className=' btn profile-edit-btn'
                  onClick={this.EditDetail}
                  name='btnAddMore'
                  value='Edit Profile'
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ViewUser);
