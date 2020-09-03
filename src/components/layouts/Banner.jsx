import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BASE_URL from "../../url"
import classnames from 'classnames'
class Banner extends Component {
    state={
        carousel:[]
    }
    index = 0
    async componentDidMount(){
        const res2 = await axios.get(`${BASE_URL}/carousel/`)
        this.setState({carousel:res2.data})
    }
    render() {
        const {carousel} = this.state;
        return (
                <React.Fragment>
                    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                         <div className="carousel-inner">
                
                            {
                                carousel.map((slider) => {
                                let isFirst = false;
                                if(this.index === 0){
                                    isFirst = true;
                                }
                                            
                                this.index = this.index + 1;
                                return(
                        
                                     <div 
                                        key={slider.id}
                                        className={classnames('carousel-item',{'active': isFirst})}
                                    >
                                        <img src={slider.image} className="d-block w-100" alt="..."/>
                                        <div className="carousel-caption  d-md-block">
                                            <p>
                                                {slider.title}
                                            </p>
                                            <h5>{slider.quote}</h5>
                                            <div className="slider-btn-wrapper">
                                                <Link to="/donor/registration">
                                                    <button className="slider-btn">Donate today</button>
                                                </Link>
                                            </div>
                                                        
                                            </div>
                                    </div>
                                            )
                                        })
                                    }
                                   
                      
                                 <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                             </div>
                         </div>
                </React.Fragment>
        )
    }
}
export default Banner;