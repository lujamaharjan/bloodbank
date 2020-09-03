import React, { Component } from 'react'

import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer'; 
import HospitalRegistration from '../layouts/HospitalRegistration'


export default class HospitalRegistrationPage extends Component {
    render() {
        return (
            <>
                <SocialMedia/>
                <Navigation/>
                <HospitalRegistration/>
                <Footer/>
            </>
        )
    }
}
