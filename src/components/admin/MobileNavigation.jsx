import React, { Component } from 'react'
import {Link} from "react-router-dom"
import avatar from '../layouts/images/Avatar_Panda-512.png'
class MobileNavigation extends Component {
    state={
        hideshow: false,
    }

    toggleHideShow = () =>{
        console.log(this.state.hideshow)
        this.setState({
            hideshow: !this.state.hideshow
        })
    }
    makeHideShowFalse= () =>{
        console.log("odoihf")
        this.setState({
            hideshow: false
        })
    }
    render() {
        const {hideshow} = this.state;
        return (
            <div className="mobile-navigation">

                <div className="nav-btn">
                    <img src={avatar} alt=""/>
                    <i className="fa fa-bars" onClick={this.toggleHideShow}></i>
                </div>
          
                {hideshow ? (
                    <div className="mobile-nav" onMouseLeave={this.makeHideShowFalse}>
                        <div className="menu-item">
                          <Link to="/bloodbank/dashboard"><p><i className="fa fa-tachometer"></i> Dashboard </p></Link>
                        </div>
                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/bloodbank">
                                <p><i className="fa fa-university"></i> BloodBank </p>
                            </Link>

                        </div>
                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/slider">
                                <p><i className="fa fa-exchange"></i> Slider </p>
                            </Link>

                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/gallery">
                                <p><i className="fa fa-picture-o"></i> Gallery </p>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/donors">
                                <p><i className="fa fa-user-o"></i> Donors </p>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/hospital">
                                <p><i className="fa fa-hotel"></i> Hospitals </p>
                            </Link>

                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/volunteers">
                                <p><i className="fa fa-handshake-o"></i> Volunteers </p>
                            </Link>

                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/announcements">
                                <p><i className="fa fa-volume-up"></i> Announcements </p>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/campaign">
                                <p><i className="fa fa-users"></i> Campagin </p>
                            </Link>

                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/sponsor">
                                <p><i className="fa fa-bitcoin"></i> Sponsors </p>
                            </Link>

                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/requests">
                                <p><i className="fa fa-reply"></i> Request </p>
                            </Link>
                        </div>

                        <div className="menu-item">
                            <Link to="/bloodbank/dashboard/stock">
                                <p><i className="fa fa-cubes"></i> Blood Stock </p>
                            </Link>
                        </div>
                    </div>
                ): ""} 
                
            </div>
        )
    }
}

export default MobileNavigation;
