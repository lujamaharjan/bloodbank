import React from 'react'
import SocialMedia from '../layouts/SocialMedia'
import Navigation from '../layouts/Navigation'
import Footer from '../layouts/Footer'

function NotFound() {
    return (
        <div>
            <SocialMedia/>
            <Navigation/>
            <div className="container notfound">
                <h2><span>404</span> Page Not Found</h2>
            </div>
            <Footer/>
        </div>
    )
}

export default NotFound;
