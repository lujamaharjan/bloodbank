import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../../url';
import { UserContext } from '../../context/UserContext';

class UserHistory extends Component {
  static contextType = UserContext;
  state = {
    userhistory: [],
    hasData: false,
  };

  componentDidMount = () => {
    // load Data based on loggedIn user(i.e Hospital or Donor)
    const { isHospital, isDonor } = this.context.value.state;
    if (isDonor && !isHospital) this.loadDonorHistory();

    else {
      this.loadHospitalData();
    }

  };

  // load Donor History Data
  loadDonorHistory = async() => {

    axios
      .get(`${BASE_URL}/donor-records/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if(res.data.donor_records.length>0){
          this.setState({ hasData: true });
          this.setState({ userhistory: res.data.donor_records });  
        }
       
      })
      .catch((error) => alert('Something went wrong'));
  };

  // load Hospital History Data
  loadHospitalData = () => {
    axios
      .get(`${BASE_URL}/hospital-records/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if(res.data.hospital_records.length>0){
          this.setState({ hasData: true });
          this.setState({ userhistory: res.data.hospital_records });
        }
       
      })
      .catch((error) => alert('Something went wrong'));
  };

  render() {
    const { hasData,userhistory } = this.state;
    console.log("hasdata=",hasData)
    return (
      <UserContext.Consumer>
        {(context) => {
          const { isHospital, isDonor } = context.value.state;
          console.log(context);
          return (
            <div>
              {isDonor && !hasData && (
                <div>
                  <p>You have no record of Blood Donation</p>
                </div>
              )}
              {!hasData && isHospital && (
                <div>
                  <p>No History</p>
                </div>
              )}
              {hasData && isDonor && (
                <div  className="container admin-donor">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campaign</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userhistory.map((donor)=>(
                          <tr key={donor.id}>
                          <td>{donor.campaign_name}</td>
                        <td>{donor.campaign_start_date_time}</td>
                        </tr>
                        ))
                      }
                    
                    </tbody>
                   
                  </table>
                </div>
              )}
              {hasData && isHospital && (
                  <div  className="container admin-donor">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Blood Type</th>
                          <th>Quantity</th>
                          <th>Requested Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          userhistory.map((hospital)=>(
                            <tr key={hospital.id}>
                            <td>{hospital.blood_type}</td>
                          <td>{hospital.quantity}</td>
                          <td>{hospital.request_date}</td>
                          </tr>
                          ))
                        }
                      
                      </tbody>
                     
                    </table>
                  </div>
              )}
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default UserHistory;
