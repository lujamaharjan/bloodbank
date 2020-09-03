import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import axios from 'axios';
import BASE_URL from '../../url';

import { UserContext } from '../../context/UserContext';
import ChangePassword from './ChangePassword';
import { Link, withRouter } from 'react-router-dom';

class EditUser extends Component {
  static contextType = UserContext;

  state = {
    selected: 0,
    full_name: '',
    hospital_name: '',
    email: '',
    address: '',
    contact_number: '',
    DOB: '',
    gender: 'male',
    blood_group: 'O+',
    profile_picture: null,
    errors: {},
  };

  onDonorUpdate = () => {
    let formData = { ...this.state };
    // Remove unecessary parameters
    delete formData['selected'];
    delete formData['errors'];
    delete formData['profile_picture'];
    delete formData['hospital_name'];
    axios
      .patch(
        `${BASE_URL}/donor-profile/${this.context.value.state.id}/`,
        formData
      )
      .then((data) => {
        alert('Profile Updated');
      });
  };

  onHospitalUpdate = () => {
    let formData = { ...this.state };
    // Remove unecessary parameters
    delete formData['selected'];
    delete formData['errors'];
    delete formData['profile_picture'];
    delete formData['full_name'];
    delete formData['DOB'];
    delete formData['gender'];
    delete formData['blood_group'];
    const ctx = this.context.value.state.userDetail;

    // console.log(this.state)
    if (ctx !== this.state) {
      axios
        .patch(
          `${BASE_URL}/hospital-profile/${this.context.value.state.id}/`,
          formData
        )
        .then((data) => {
          alert('Profile Updated');
        })
        .catch((error) => alert(error));
    }
  };

  componentDidMount = () => {
    const ctx = this.context.value.state.userDetail;
    console.log(ctx);
    // pass by values ctx into state
    // copy values from context state into class state
    this.setState({ ...ctx });
  };

  changeSelected = (e, id) => {
    e.preventDefault();
    this.setState({ selected: id });
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  goBack = (e) => {
    e.preventDefault();
    const id = localStorage.getItem('userId');
    this.props.history.push(`/donor/detail/${id}`);
  };

  render() {
    const {
      selected,
      full_name,
      email,
      address,
      contact_number,
      DOB,
      hospital_name,
    } = this.state;
    return (
      <UserContext.Consumer>
        {(context) => {
          const { isDonor, isHospital } = context.value.state;
          return (
            <div className='EditDetail mt-4'>
              <div className='btn-section text-center mt-4'>
                <Link
                  className='btn active'
                  onClick={(e) => {
                    this.changeSelected(e, 0);
                  }}
                >
                  Edit User Details
                </Link>
                <Link
                  className='btn'
                  onClick={(e) => {
                    this.changeSelected(e, 1);
                  }}
                  to=''
                >
                  Change Password
                </Link>
              </div>
              {selected === 1 && <ChangePassword />}
              {selected === 0 && (
                <div className='container'>
                  <Form>
                    <Form.Field>
                      {isDonor && !isHospital ? (
                        <label>Full Name</label>
                      ) : (
                        <label>Hospital Name</label>
                      )}
                      {isDonor && !isHospital ? (
                        <input
                          placeholder='First Name'
                          value={full_name}
                          onChange={this.onInputChange}
                          name='full_name'
                        />
                      ) : (
                        <input
                          placeholder='Hospital Name'
                          value={hospital_name}
                          onChange={this.onInputChange}
                          name='hospital_name'
                        />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input
                        placeholder='Last Name'
                        value={email}
                        onChange={this.onInputChange}
                        name='email'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Address</label>
                      <input
                        placeholder='Address'
                        value={address}
                        onChange={this.onInputChange}
                        name='address'
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Phone</label>
                      <input
                        value={contact_number}
                        onChange={this.onInputChange}
                        name='contact_number'
                      />
                    </Form.Field>
                    {isDonor && !isHospital && (
                      <Form.Field>
                        <label>Date of Birth</label>
                        <input
                          type='Date'
                          value={DOB}
                          onChange={this.onInputChange}
                          name='DOB'
                        />
                      </Form.Field>
                    )}

                    <Form.Field>
                      {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
                    </Form.Field>
                    <div className='text-center'>
                      <button
                        type='submit'
                        className='btn btn-danger mr-2'
                        onClick={
                          isDonor && !isHospital
                            ? this.onDonorUpdate
                            : this.onHospitalUpdate
                        }
                      >
                        Submit
                      </button>
                      <button
                        type='submit'
                        className='btn btn-danger'
                        onClick={this.goBack}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(EditUser);
