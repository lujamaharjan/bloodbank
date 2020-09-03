import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames'
import BASE_URL from '../../url'


class HospitalRegistration extends Component {
    state={
        'hospital_name':'',
        'email':'',
        'password':'',
        'confirm_password':'',
        'address':'',
        'contact_number':'',
        'errors':{}
    }
    onInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };
  
    onSubmit = async(e) => {
        e.preventDefault();
        const {hospital_name, email, password, confirm_password, address, contact_number} = this.state;
        if(hospital_name === ''){
            this.setState({errors: {name: "Name is Required!"}})
            return;
        }
        if(email === ''){
            this.setState({errors: {email: "Email is Required!"}})
            return;
        }
        if(password === ''){
            this.setState({errors: {password: "Password is Required!"}})
            return;
        }
        if(confirm_password !== password){
            this.setState({errors: {confirm_password: "Password not Matched!"}})
            return;
        }
        if(address === ""){
            this.setState({errors: {address: "Address is Required!"}})
            return;
        }
        if(contact_number === ''){
            this.setState({errors: {contact_number: "Contact_number is Required!"}})
            return;
        }
        
        const newHospital = {
            hospital_name,
            email,
            password,
            confirm_password,
            address,
            contact_number
        }
        const res = await axios.post( `${BASE_URL}/hospital/registration/`, newHospital)
        if(res.status === 201){
            alert('Hospital Added Successfully')
        }
        else{
            alert('something went wrong')
        }

        this.setState({
            'hospital_name':'',
            'email':'',
            'password':'',
            'confirm_password':'',
            'address':'',
            'contact_number':'',
            'errors':{}
        })
       
    }
    render() {
        const {hospital_name, email, password, confirm_password, address, contact_number, errors} = this.state;
        return (
            <div className="donor-registration">
                <div className="donor-registration-title">
                    <h4>Hospital Registration Form</h4>
                </div>

                <div className="card col-md-8 mx-auto pt-4">
                    <p>Please fill up the form </p>
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <div className='form-group'>
                            <label htmlFor='hosputal name'>Hospital Name</label>
                            <input
                             type='text'
                             className={classnames('form-control',{'is-invalid':errors.name})} 
                             placeholder='Enter Hospital Name' 
                             name='hospital_name' 
                             value={hospital_name} 
                             onChange={this.onInputChange}  
                             />
                             {
                                 errors.name &&
                                 <div className="invalid-feedback">{errors.name}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input 
                            type="email"
                            className={classnames('form-control',{'is-invalid':errors.email})} 
                            placeholder='Enter Hospital Email Address' 
                            name='email' 
                            value={email} 
                            onChange={this.onInputChange} />
                            {
                                 errors.email &&
                                 <div className="invalid-feedback">{errors.email}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input  
                            type="password"
                            className={classnames('form-control',{'is-invalid':errors.password})}  
                            placeholder='Enter Password' 
                            name='password' value={password}
                            onChange={this.onInputChange}
                            />
                            {
                                 errors.password &&
                                 <div className="invalid-feedback">{errors.password}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Confirm Password</label>
                            <input 
                            type="password"
                            className={classnames('form-control',{'is-invalid':errors.confirm_password})} 
                            placeholder='Re-enter Password'
                            name='confirm_password'
                            value={confirm_password}
                            onChange={this.onInputChange}
                            />
                            {
                                 errors.confirm_password &&
                                 <div className="invalid-feedback">{errors.confirm_password}</div>
                             }
                        </div>

                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <input type='text' 
                            className={classnames('form-control',{'is-invalid':errors.address})} 
                            placeholder='Enter Address' 
                            name='address'
                            value={address} 
                            onChange={this.onInputChange} 
                            />
                            {
                                 errors.address &&
                                 <div className="invalid-feedback">{errors.address}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='contact number'>Contact Number</label>
                            <input 
                            type='text' 
                            className={classnames('form-control',{'is-invalid':errors.contact_number})} 
                            placeholder='Enter Contact Number' 
                            name='contact_number' 
                            value={contact_number} 
                            onChange={this.onInputChange}/>
                            {
                                 errors.contact_number &&
                                 <div className="invalid-feedback">{errors.contact_number}</div>
                             }
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default HospitalRegistration;