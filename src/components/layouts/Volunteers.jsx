import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';


class Volunteers extends Component {

    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const { volunteers } = value;
            
                        return (
                            <section className="volunteer">
                                <div className="container">
                                    <h2 className="volunteer-title animate__heartBeat"><span>TOP &nbsp;VOLUNTEERS</span></h2>
                                    <h4 className="volunteer-cotes">
                                        The volunteers who give their time and <br /> talents help to fulfill our mission.
                    </h4>

                                    <div className="row">
                                        {
                                            volunteers.map((volunteer_data) => (
                                                <div className="col-md-4" key={volunteer_data.id}>
                                                    <div className="card">
                                                        <img src={volunteer_data.volunteer_profile_pic} alt="volunteer" className="animate__heartBeat card-img-top" />
                                                        <h3 className="volunteer-name">{volunteer_data.volunteer_name}</h3>
                                                        <h3 className="volunteer-proffession">{volunteer_data.volunteer_role}</h3>
                                                    </div>
                                                </div>

                                            ))


                                        }

                                    </div>

                                    <div className="text-center">
                                        <Link to='/volunteer/registration'><button className="volunteer-btn">Become a volunteer</button></Link>
                                    </div>

                                </div>
                            </section>
                        )
                    }
                }
            </Consumer>

        )
    }
}


export default Volunteers;
