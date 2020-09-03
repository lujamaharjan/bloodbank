import React, { Component } from 'react'

import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer'; 
import DonorRegistrationForm from '../layouts/DonorRegistrationForm'
export default class DonorRegistrationPage extends Component {
    render() {
        return (
            <div>
                <SocialMedia/>
                <Navigation/>
                <DonorRegistrationForm/>
                <Footer/>
            </div>
        )
    }
}
