import React, { Component } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import BASE_URL from "../../../../url";
import classnames from "classnames";

class Addhospital extends Component {
  state = {
    hospital_name: "",
    email: "",
    contact_number: "",
    address: "",
    password :"",
    confirm_password :"",
    error: {},
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFormSubmit = async (e) => 
  {
    e.preventDefault();
    const {hospital_name, email , contact_number , address , password , confirm_password } = this.state;

    if (hospital_name === "") {
      this.setState({ error: { hospital_name: "Hospital Name is Required" } });
      return;
    }

    if (email === "") {
      this.setState({ error: { email: "Email is Required" } });
      return;
    }

    if (contact_number === "") {
      this.setState({ error: { contact_number: "Contact Number is Required" } });
      return;
    }

    if (address === "") {
      this.setState({ error: { address: "Location is Required" } });
      return;
    }

    if (password === "") {
      this.setState({ error: { password: "Password is Required" } });
      return;
    }

    if (confirm_password === "") {
      this.setState({ error: { confirm_password: "Confirm Password is Required" } });
      return;
    }

    if(password !== confirm_password){
      this.setState({error : {password:"Password not match !!!"}})
    }

    const newHospital = {
      hospital_name,
      email,
      password,
      confirm_password,
      address,
      contact_number
  }
    console.log("new hospital=",newHospital);


    try{
      const res = await axios.post(`${BASE_URL}/hospital/registration/`, newHospital,{
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        }
        });
      this.setState({
        'hospital_name' : '',
        'email' : '',
        'contact_number': '',
        'address' : '',
        'password':'',
        'confirm_password':'',
        'error' : {}
      })
    

    this.props.history.push("/bloodbank/dashboard/hospital");
    if (res.status === 201)
      toast.success("Hospital Registration added successfully!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    else
      toast.error("something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      }) 
      window.location.reload(false);
    }
    catch(err){
      // alert('Email should be unique !!!')
    }
  };


  render() {
    const{hospital_name, email, contact_number, address, password, confirm_password, error} = this.state;
    return (
      <div className="container add-donor">
        
        <form className="col-md-8 mx-auto" onSubmit={this.onFormSubmit}>
        <h4>Add New Hospital </h4>
          <div className="form-group">
            <label htmlFor="hospital_name">Name</label>
            <input
              type="text"
              name="hospital_name"
              className={classnames("form-control",  {
                "is-invalid":error.hospital_name
              })}
              placeholder = 'Enter your hospital name'
              hospital_name = 'hospital_name'
              value = {hospital_name}
              onChange={this.onInputChange}
            />
            {error.hospital_name && 
              <div className="invalid-feedback">{error.hospital_name}</div>
            }
          </div>

        
          
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className={classnames("form-control",  {
                "is-invalid":error.email
              })}
              placeholder = 'Enter your hospital email'
              hospital_email = 'email'
              value = {email}
              onChange={this.onInputChange}
            />
            {error.email && 
              <div className="invalid-feedback">{error.email}</div>
            }
          </div>


        
        <div className="form-group">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              type="text"
              name="contact_number"
              className={classnames("form-control",  {
                "is-invalid":error.contact_number
              })}
              placeholder = 'Enter your hospital contact number'
              contact_number = 'contact_number'
              value = {contact_number}
              onChange={this.onInputChange}
            />
            {error.hospital_contact_number && 
              <div className="invalid-feedback">{error.contact_number}</div>
            }
          </div>


        

        <div className="form-group">
            <label htmlFor="address">Location</label>
            <input
              type="text"
              name="address"
              className={classnames("form-control",  {
                "is-invalid":error.address
              })}
              placeholder = 'Enter your hospital address'
              address = 'address'
              value = {address}
              onChange={this.onInputChange}
            />
            {error.address && 
              <div className="invalid-feedback">{error.address}</div>
            }
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className={classnames("form-control",  {
                "is-invalid":error.password
              })}
              placeholder = 'Enter your password'
              password = 'password'
              value = {password}
              onChange={this.onInputChange}
            />
            {error.password && 
              <div className="invalid-feedback">{error.password}</div>
            }
          </div>


          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              className={classnames("form-control",  {
                "is-invalid":error.confirm_password
              })}
              placeholder = 'Enter your correct password'
              address = 'confirm_password'
              value = {confirm_password}
              onChange={this.onInputChange}
            />
            {error.address && 
              <div className="invalid-feedback">{error.confirm_password}</div>
            }
          </div>

            <button type='submit' className='btn btn-danger mb-4'>Add Hospital</button>
            

        </form>
      </div>
    );
  }
}
export default Addhospital