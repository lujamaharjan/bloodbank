import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import BASE_URL from '../../url';

class DonorRegistrationForm extends Component {
    constructor(props){
        super(props)
            this.state = {
                'full_name': '',
                'email': '',
                'password': '',
                'confirm_password': '',
                'address': '',
                'contact_number': "",
                'DOB': '',
                'gender': 'male',
                'blood_group': 'O+',
                'profile_picture': null,
                'errors':{}
            }
        
            this.baseState = this.state
        
        }


    resetForm = () => {
        this.setState(this.baseState)
    }


    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    
    handleImageChange=(event)=>{
        this.setState({profile_picture:event.target.files[0]})
    }

    onFormSubmit = async(e) =>{
        e.preventDefault();
        const {full_name,email,password,confirm_password,address,contact_number,DOB,gender,blood_group}=this.state;
        if(full_name === ''){
            this.setState({errors: {name: "Full Name is Required!"}})
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
            this.setState({errors: {confirm_password: "Password do not Matched!"}})
            return;
        }
        if(address === ""){
            this.setState({errors: {address: "Address is Required!"}})
            return;
        }
        if(contact_number === ''){
            this.setState({errors: {contact_number: "Contact number is Required!"}})
            return;
        }
        if(DOB === ''){
            this.setState({errors: {DOB: "Date of Birth is Required!"}})
            return;
        }
        if(gender === ''){
            this.setState({errors: {gender: "Gender is Required!"}})
            return;
        }
        if(blood_group === ''){
            this.setState({errors: {blood_group: "Blood group is Required!"}})
            return;
        }
        const formData = new FormData();
        formData.append("full_name",this.state.full_name);
        formData.append("email",this.state.email);
        formData.append("password",this.state.password);
        formData.append("address",this.state.address);
        formData.append("contact_number",this.state.contact_number);
        formData.append("DOB",this.state.DOB);
        formData.append("gender",this.state.gender);
        formData.append("blood_group",this.state.blood_group);
        formData.append("profile_picture",this.state.profile_picture,this.state.profile_picture.name);
        await axios.post( `${BASE_URL}/donor/registration/`, formData);
        this.resetForm()
        alert('Doner Created Successfully')
       
    }

    

    render() {
        let password_validations = '';
        let age_verification = '';
        let submit_button = <button type="submit">Register</button>;

        if (this.state.confirm_password) {
            if (this.state.password !== this.state.confirm_password) {
                password_validations = <span style={{ color: 'red' }}>Password Not Matched.</span>
            }
        }
        let today = new Date();
        let year = today.getFullYear();
        let form_year = this.state.DOB.split('-')
        if (year - form_year[0] < 18) {
            age_verification = <span style={{ color: "red" }}>Age should be greater than 18.</span>
            submit_button = <button type="submit" disabled>Register</button>
        }


        const { full_name, email, password, confirm_password, address, contact_number, DOB, gender, blood_group,errors } = this.state;
        return (
            <div className="donor-registration">
                <div className="donor-registration-title">
                    <h4>Donor Registration Form</h4>
                </div>

                <div className="card col-md-8 mx-auto pt-4">
                    <p>Please fill up the form and help the millions of people</p>
                    <form onSubmit={this.onFormSubmit}>
                        <div className='form-group'>
                            <label htmlFor='full name'>Full Name</label>
                            <input type='text' className={classnames('form-control',{'is-invalid':errors.name})} 
                             placeholder='Enter Your full name' name='full_name' value={full_name} onChange={this.onInputChange} />
                            {
                                 errors.name &&
                                 <div className="invalid-feedback">{errors.name}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input type='email' className={classnames('form-control',{'is-invalid':errors.email})} 
                             placeholder='Enter Your Email Address' name='email' onChange={this.onInputChange} value={email} />
                            {
                                 errors.email &&
                                 <div className="invalid-feedback">{errors.email}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className={classnames('form-control',{'is-invalid':errors.password})}  placeholder='Enter Password' name='password' onChange={this.onInputChange} value={password}/>
                            {
                                 errors.password &&
                                 <div className="invalid-feedback">{errors.password}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Confirm Password</label>
                            <input type='password' className={classnames('form-control',{'is-invalid':errors.confirm_password})}  placeholder='Re-enter Password' name='confirm_password' onChange={this.onInputChange} value={confirm_password}/>
                            {
                                 errors.confirm_password &&
                                 <div className="invalid-feedback">{errors.confirm_password}</div>
                             }
                            {password_validations}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <input type='text' className={classnames('form-control',{'is-invalid':errors.address})} placeholder='Enter Your Address' name='address' onChange={this.onInputChange} value={address}/>
                            {
                                 errors.address &&
                                 <div className="invalid-feedback">{errors.address}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='contact number'>Mobile Number</label>
                            <input type='text' className={classnames('form-control',{'is-invalid':errors.contact_number})} placeholder='Enter Your Mobile Number' name='contact_number' value={contact_number} onChange={this.onInputChange}/>
                            {
                                 errors.contact_number &&
                                 <div className="invalid-feedback">{errors.contact_number}</div>
                             }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='dob'>Date Of Birth</label>
                            <input type='date' className={classnames('form-control',{'is-invalid':errors.DOB})} name='DOB' value={DOB} onChange={this.onInputChange} />
                            {age_verification}
                            {
                                 errors.DOB &&
                                 <div className="invalid-feedback">{errors.DOB}</div>
                             }
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select className={classnames('form-control',{'is-invalid':errors.gender})}  required name='gender' value={gender} onChange={this.onInputChange} >
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='others'>Others</option>
                            </select>
                            {
                                 errors.gender &&
                                 <div className="invalid-feedback">{errors.gender}</div>
                             }
                        </div>

                        <div className="form-group">
                            <label htmlFor="blood-group">Blood Group</label>
                            <select className={classnames('form-control',{'is-invalid':errors.blood_group})}  name='blood_group' value={blood_group} onChange={this.onInputChange} >
                                <option value='O+'>O-Positive</option>
                                <option value='O-'>O-Negative</option>
                                <option value='A+'>A-Positive</option>
                                <option value='A-'>A-Negative</option>
                                <option value='B+'>B-Positive</option>
                                <option value='B-'>B-Negative</option>
                                <option value='AB+'>AB-Positive</option>
                                <option value='AB-'>AB-Negative</option>
                            </select>
                            {
                                 errors.blood_group &&
                                 <div className="invalid-feedback">{errors.blood_group}</div>
                             }
                        </div>

                        <div>
                            <h5><label>I have not suffered from</label></h5>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />  &nbsp;
                            Heart diseases
                        </label>

                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                            AIDS
                        </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                            Cancer
                        </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                        Hepatitis B, C
                        </label>
                        </div>
                        <div>
                            <label htmlFor="eligibilitycheck"><h5>Please check your eligibility to donate blood</h5></label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                                My hemoglobin is not less than 12.5 grams.
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                                I am free from acute respiratory diseases and skin diseases.
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                                I do not carry any disease transmissible by blood transfusion.
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" required />&nbsp;
                                I am not under medication for Malaria / Tuberculosis / Diabetes / Fits / Convulsions
                            </label>
                        </div>
                        <div className='form-group' style={{ margin: "30px 0" }}>
                            <label htmlFor='profile picture'>Profile Picture</label>
                            <input type='file' className='form-control-file' accept="image/*"  onChange={this.handleImageChange} />
                        </div>
                        {submit_button}
                    </form>
                </div>
            </div>
        )
    }

}

export default DonorRegistrationForm;