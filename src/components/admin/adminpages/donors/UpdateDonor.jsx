import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

import classnames from 'classnames';
import {Consumer} from '../../../../context'
import BASE_URL from '../../../../url'

class UpdateDonor extends Component {

    state = {
            full_name: '',
            email: '',
            password: '',
            address: '',
            contact_number: "",
            DOB: '',
            gender: '',
            blood_group: '',
            profile_picture: null,
            errors:{}
         }
    
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        };
    
    handleImageChange=(event)=>{
        this.setState({profile_picture:event.target.files[0]})
    }
    
   

    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/donor-profile/${id}/`);
        const donor = response.data;
        console.log(donor)
        this.setState({
            full_name: donor.full_name,
            email: donor.email,
            address: donor.address,
            contact_number: donor.contact_number,
            DOB:donor.DOB,
            gender: donor.gender,
            blood_group: donor.blood_group,
            profile_picture: donor.profile_picture,
        })
    }
  
    

      handleSubmit = async(dispatch, e) => {
        e.preventDefault();
        const {full_name, email, password,
            address, contact_number, DOB,  gender,
            blood_group, profile_picture} = this.state;

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
        
        if(address === ""){
            this.setState({errors: {address: "Address is Required!"}})
            return;
        }
        if(contact_number === ''){
            this.setState({errors: {contact_number: "Contact_number is Required!"}})
            return;
        }
        if(DOB === ''){
            this.setState({errors: {DOB: "Date of Birth is Required!"}})
            return;
        }
        let today = new Date();
        let year = today.getFullYear();
        let form_year = DOB.split('-')
        if (year - form_year[0] <= 18) {
            this.setState({errors: {DOB: "User must be atleat 18 years!"}})
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

        const {id} = this.props.match.params
        const formData = new FormData();
        formData.append("full_name",this.state.full_name);
        formData.append("email",this.state.email);
        formData.append("password",this.state.password);
        formData.append("address",this.state.address);
        formData.append("contact_number",this.state.contact_number);
        formData.append("DOB",this.state.DOB);
        formData.append("gender",this.state.gender);
        formData.append("blood_group",this.state.blood_group);
        if(profile_picture !== null)
            formData.append("profile_picture", this.state.profile_picture, this.state.profile_picture.name)

        const res = await axios.put(`${BASE_URL}/donor-profile/${id}/`, formData,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        dispatch({type: "UPDATE_DONOR", payload: res.data})
        this.setState({
            'full_name': '',
            'email': '',
            'password': '',
            'address': '',
            'contact_number': "",
            'DOB': '',
            'gender': '',
            'blood_group': '',
            'profile_picture': null,
            'errors':{}
        })

        this.props.history.push('/bloodbank/dashboard/donors')
        if(res.status === 200)
            toast.success("Donor update sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
        else
            toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
    }


    render() {
        const { full_name, email, password, 
            address, contact_number, DOB, gender, blood_group, errors } = this.state;
        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch} = value;
                        return(
                            <div className="add-gallery container mx-auto">
                                <h4 className="py-4">Update Donor Info</h4>
                                <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                            
                                <div className='form-group' >
                                        <label htmlFor='full name'>Full Name</label>
                                        <input 
                                        type='text' 
                                        className={classnames('form-control',{'is-invalid':errors.name})}  
                                        placeholder='Enter Your full name' 
                                        name='full_name' 
                                        value={full_name} 
                                        onChange={this.onInputChange} />
                                        {
                                            errors.name &&
                                            <div className="invalid-feedback">{errors.name}</div>
                                        }
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='email'>Email Address</label>
                                        <input type='email' 
                                        className={classnames('form-control',{'is-invalid':errors.email})}  
                                        placeholder='Enter Your Email Address' 
                                        name='email' 
                                        onChange={this.onInputChange} 
                                        value={email} />
                                        {
                                            errors.email &&
                                            <div className="invalid-feedback">{errors.email}</div>
                                        }
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input 
                                        type='password' 
                                        className={classnames('form-control',{'is-invalid':errors.password})}  
                                        placeholder='Enter Password' 
                                        name='password' 
                                        onChange={this.onInputChange} 
                                        value={password}/>
                                        {
                                            errors.password &&
                                            <div className="invalid-feedback">{errors.password}</div>
                                        }
                                    </div>
                    
                                    <div className='form-group'>
                                        <label htmlFor='address'>Address</label>
                                        <input 
                                        type='text' 
                                        className={classnames('form-control',{'is-invalid':errors.address})} 
                                        placeholder='Enter Your Address' 
                                        name='address' 
                                        onChange={this.onInputChange} 
                                        value={address}/>
                                        {
                                            errors.address &&
                                            <div className="invalid-feedback">{errors.address}</div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='contact number'>Mobile Number</label>
                                        <input 
                                        type='text' 
                                        className={classnames('form-control',{'is-invalid':errors.contact_number})} 
                                        placeholder='Enter Your Mobile Number' 
                                        name='contact_number' 
                                        value={contact_number} 
                                        onChange={this.onInputChange}/>
                                        {
                                            errors.contact_number &&
                                            <div className="invalid-feedback">{errors.contact_number}</div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='dob'>Date Of Birth</label>
                                        <input 
                                        type='date' 
                                        className={classnames('form-control',{'is-invalid':errors.DOB})} 
                                        name='DOB' 
                                        value={DOB} 
                                        onChange={this.onInputChange} />
                                        {
                                            errors.DOB &&
                                            <div className="invalid-feedback">{errors.DOB}</div>
                                        }
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="gender">Gender</label>
                                        <select 
                                        className={classnames('form-control',{'is-invalid':errors.gender})}  
                                        required name='gender' 
                                        value={gender} 
                                        onChange={this.onInputChange} >
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
                                        <select 
                                        className={classnames('form-control',{'is-invalid':errors.blood_group})}  
                                        name='blood_group' 
                                        value={blood_group} 
                                        onChange={this.onInputChange} >
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
                                    <div className='form-group' style={{ margin: "30px 0" }}>
                                        <label htmlFor='profile picture'>Profile Picture</label>
                                        <input 
                                        type='file' 
                                        className='form-control-file'
                                        name ="profile_picture" 
                                        accept="image/*"  
                                        onChange={this.handleImageChange} />
                                    </div>   
                                    <button type="submit" className="btn btn-danger">Update</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default UpdateDonor;

