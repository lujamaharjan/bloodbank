import React from 'react'
import {Link} from "react-router-dom"
import IntroSection from '../layouts/IntroSection';
import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Volunteers from '../layouts/Volunteers';
import Footer from '../layouts/Footer';
function About() {
    return (
        <React.Fragment>
            <SocialMedia/>
            <Navigation/>
            <div className="home-contact">
                <h4>About us</h4>
                <p><Link to="/">Home </Link> / About</p>
            </div>
            <IntroSection/>
            <Volunteers/>
            <Footer/>
        </React.Fragment>
    )
}

export default About
