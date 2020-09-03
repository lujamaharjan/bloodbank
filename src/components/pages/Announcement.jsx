import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer';
import { Consumer } from '../../context';


class Announcement extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { announcements } = value;
                        return (
                            <>
                                <SocialMedia />
                                <Navigation />
                                <div className="announcement">
                                    <div className="home-contact">
                                        <h4>Announcements</h4>
                                        <p><Link to="/">Home </Link> / Announcements</p>
                                    </div>
                                    <h4 className="title"><span>Announcements</span></h4>
                                    <div className="announcement-list">
                                        <div className="row">
                                            {
                                                announcements.map((announcement_data) => (
                                                    <div className="col-md-4" key={announcement_data.id}>
                                                        <div className="card" style={{ width: "18rem" }}>
                                                            <Link to={`announcement/${announcement_data.id}`}>
                                                                <img className="card-img-top" src={announcement_data.feature_image} alt="Cardcap" />
                                                                <div className="card-body">
                                                                    <p className="card-text">{announcement_data.title}</p>
                                                                </div>
                                                            </Link>
                                                            
                                                        </div>
                                                    </div>

                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </>
                        )
                    }
                }
            </Consumer>
        )
    }

}

export default Announcement;
