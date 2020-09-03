import React, { Component } from 'react';
import annoncePhoto from '../layouts/images/blog3.jpg'


import SocialMedia from '../layouts/SocialMedia'
import Navigation from '../layouts/Navigation'
import Footer from '../layouts/Footer'

class AnnouncementDetail extends Component {
    render() {
        return (
            <>
                <SocialMedia/>
                <Navigation/>
                <div className="announcement-detail">
                    <h4>This is the announcemnet title page! </h4>
                    <div class="imagediv">
                        <img src={annoncePhoto} alt=""/>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus? 
                        Veritatis, dolore dicta aliquid hic est non qui. 
                        Dolor quaerat laudantium illo perferendis architecto est incidunt vero distinctio ex ad.
                    </p>
                </div>
                <Footer/>
            </>
        )
    }
}

export default AnnouncementDetail;

