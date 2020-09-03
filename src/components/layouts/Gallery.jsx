import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Consumer} from '../../context'



class Gallery extends Component {

    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        const {gallery} = value;
                        return(
                            <div className="gallery">
                            <h2><span>Campaign Gallery</span></h2>
                            <h4>Our prestigious voluntary work on campaigns by the team.</h4>
                            <div className='row'>
                               {
                                   gallery.map((data)=>(
                                    <div className='col-md-4' key={data.id}>
                                    <div className="card">
                                        <img className="card-img-top" src={data.image} alt="gallery" />
                                    </div>
                                </div>
            
                                   ))
                               }
            
                            </div>
            
                            <div>
                                <h2 id="gallerysecondh2">Become A Part Of Great Work Today</h2>
                                <p>
                                You can give blood at any of our blood donation venues all over the world. <br/>
                                We have total sixty thousands donor centers and visit thousands
                                of other venues on various occasions. 
                                </p>
                               <Link to="/donor/registration">
                                    <button className="gallery-btn">JOIN WITH US</button>
                               </Link> 
                            </div>
            
                        </div>
                        )
                    }
                }
            </Consumer>
           
        )
    }
}

export default Gallery;
