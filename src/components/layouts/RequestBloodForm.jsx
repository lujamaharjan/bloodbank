import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../url';

class RequestBloodForm extends Component {
  state = {
    blood_type: 'O+',
    quantity: 0,
    hospital: '',
  };

  componentDidMount = () => {
    const id = localStorage.getItem('userId');
    this.setState({ hospital: id });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log('value=',event.target.value)
  };

  goBack = (e) => {
    e.preventDefault();
    this.props.cancel();
  };

  onRequestBloodSubmit = async(e) => {
    console.log("state=",this.state);
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/bloodrequest/`, this.state)
      .then((res) => {
        alert('Request sent successfully');
        this.props.requestBlood();
      })
      .catch((error) => {
        alert('Something went wrong');
      });
  };

  render() {
    const { blood_type, quantity } = this.state;
    return (
      <>
        <div className='container'>
          <h2 className='text-center'>Request Blood</h2>
          <div className='card col-md-8 mt-5 mx-auto p-5'>
            <form onSubmit={this.onRequestBloodSubmit}>
              <div className='form-group '>
                <label className='col-md-4' htmlFor='password'>
                  Blood Group
                </label>
                <select
                  className='col-md-6 h-35'
                  name='blood_type'
                  value={blood_type}
                  onChange={this.onInputChange}
                >
                  <option value='O+'>O-Positive</option>
                  <option value='O-'>O-Negative</option>
                  <option value='A+'>A-Positive</option>
                  <option value='A-'>A-Negative</option>
                  <option value='B+'>B-Positive</option>
                  <option value='B-'>B-Negative</option>
                  <option value='AB+'>AB-Positive</option>
                  <option value='AB-'>AB-Negative</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='col-md-4' htmlFor='password'>
                  No of Packets
                </label>
                <input
                  type='number'
                  placeholder='No of packets'
                  onChange={this.onInputChange}
                  className='col-md-6'
                  value={quantity}
                  name='quantity'
                  min='1'
                  max='5'
                />
              </div>
              <div className='text-center mt-4'>
                <button type='submit' className=' btn btn-danger mr-2 '>
                  Submit
                </button>
                <button
                  type='button'
                  onClick={this.goBack}
                  className=' btn btn-danger '
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(RequestBloodForm);
