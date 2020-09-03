import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer';

class Contact extends Component {

    render() {
        return (
            <>
                <SocialMedia/>
                <Navigation/>
                <section className="contact">

                    <div className="home-contact">
                        <h4>Contact us</h4>
                        <p><Link to="/">Home </Link> / Contact</p>
                    </div>

                    <div className="contact-detail">
                        <h4><span>Contact us</span></h4>
                        <hr/>
                        <div className="row">
                            <div className="col-md-3">
                                <p><i className="fa fa-home"></i>Jhamsikehel, Lalitpur</p>
                            </div>
                            <div className="col-md-3">
                                <p><i className="fa fa-phone"></i> 01 5591319</p>
                            </div>
                            <div className="col-md-3">
                                <p><i className="fa fa-envelope"></i> support@bloodbank.com</p>
                            </div>
                            <div className="col-md-3">
                                <p><i className="fa fa-globe"></i> Jhamsikehel, Lalitpur</p>
                            </div>
                        </div>
                    </div>

                    <div className="form-map">
                        <div className="row">

                            <div className="col-md-6">
                                <h4>say hello to us</h4>
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-9"></div>
                                </div>
                                <form>
                                    <input type="text" placeholder="Name"/>
                                    <input type="email" placeholder="Email"/>
                                    <input type="text" placeholder="Subject"/>
                                    <textarea placeholder="Message"></textarea>
                                    <button>Send now</button>
                                </form>
                            </div>

                            <div className="col-md-6">
                                <h4>Our location</h4>
                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-9"></div>
                                </div>
                                <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2464349861807!2d85.30753131490079!3d27.678777282803708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1835ca9850eb%3A0x12ba31ab789787eb!2sJhamsikhel%20Chowk!5e0!3m2!1sen!2snp!4v1597484487643!5m2!1sen!2snp" 
                                width="100%" height="360" frameBorder="0" 
                                style={{border: '0'}} allowFullScreen="" 
                                title="1"
                                aria-hidden="false" tabIndex="0">
                                </iframe>
                            </div>

                        </div>
                    </div>


                </section>
                <Footer/>
            </>
        )
    }
}

export default Contact;
