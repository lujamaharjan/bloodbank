import React, { Component } from 'react';
import {Link} from 'react-router-dom';


import { Consumer } from '../../context'

class Footer extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { bloodbankinfo } = value;

                        return (
                            <section className="footer">
                                <div className="container">
                                    <div className="first-footer">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img src={bloodbankinfo.logo_white} alt="logo" />
                                            </div>
                                            <div className="col-md-9">
                                                <p>
                                                    We are world largest and trustful blood donation center.
                                                    We have been working since 1973 with a prestigious vision
                                                    to helping patient to provide blood. We are working all over
                                                    the world, organizing blood donation campaign to grow awareness
                                                    among the people to donate blood.
                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="second-footer">
                                        <div className="row">
                                            <div className="col-md-4 py-4">
                                                <h4 className="py-4">CONTACT US</h4>
                                                <div className="contact-mail">
                                                    <p>
                                                        <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        {bloodbankinfo.blood_bank_email}

                                                    </p>
                                                </div>
                                                <div className="contact-address">
                                                    <p><i className="fa fa-paper-plane" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                        {bloodbankinfo.blood_bank_address}, <br />
                                                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bloodbank_address[1]} */}
                                                    </p>
                                                </div>
                                                <div className="contact-phone">
                                                    <p><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                        office: ({bloodbankinfo.phone_number}) <br />
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cell: (+977) {bloodbankinfo.mobile_number}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-md-4 py-4">
                                                <h4 className="py-4">QUICK LINKS</h4>
                                                <ul>
                                                    <li><Link to="/">Home</Link></li>
                                                    <li><Link to="/announcement">Announcement</Link></li>
                                                    <li><Link to="/about-us">About us</Link></li>
                                                    <li><Link to="/contact-us">Contact us</Link></li>
                                                </ul>
                                            </div>

                                            <div className="col-md-4 py-4">
                                                <h4 className="py-4">SUBSCRIBE US</h4>
                                                <p>Signup for regular newsletter and stay up to date with our latest news.</p>
                                                <form>
                                                    <input placeholder="Enter Your Mail" required />
                                                    <button type="submit">SUBRISCRIBE NOW</button>
                                                </form>
                                            </div>

                                        </div>
                                    </div>


                                </div>
                                <div className="third-footer">
                                    <p>Copyright 2020 - Blood Bank by FourCoders. All Rights Reserved.</p>
                                </div>
                            </section>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default Footer
