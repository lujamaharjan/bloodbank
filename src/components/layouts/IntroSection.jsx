import React from 'react';
import about from './images/about.jpg';

const IntroSection = () => {
    return (
        <div className="container intro">
            <div className="row">
                <div className="col-md-6">
                    <h4>Who we are?</h4>

                    <div className="underline"></div>

                    <h6>Blood Bank is for public who are need of blood during emergencies.
                        It is also for volunteers who want to help others and bring smile.
                    </h6>
                    <p><i className="fa fa-circle-o"></i>Specialist blood donors and clinical supervision.</p>
                    <p><i className="fa fa-circle-o"></i>Increasing communuication with our members.</p>
                    <p><i className="fa fa-circle-o"></i>High quality assesmen, diagnosis and treatment.</p>
                    <p><i className="fa fa-circle-o"></i>Examine critically to ensure alignment.</p>
                    <p><i className="fa fa-circle-o"></i>The extra care of a multi-disciplinary team.</p>
                </div>
                <div className="col-md-6">
                    <img src={about} alt="About"/>
                </div>
            </div>
        </div>
    )
}

export default IntroSection;
