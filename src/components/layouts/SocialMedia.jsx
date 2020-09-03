import React , {Component} from 'react'

class SocialMedia extends Component{
    render(){
        return(
                <div className="social-media-nav">
                    <div className=" no-padding container ">
                        <nav className="navbar navbar-expand-lg  red-background no-padding ">
                            <div className="container">
                            <div className="col-md-8 col-sm-12 align-middle white-font ">
                            <p className= "my-auto">
                                <span><i className="fa fa-building-o"></i> <strong>Contact: </strong>  Suryabinayak, Nepal, 44600</span>
                                <span>&nbsp;<i className="fa fa-phone"></i> <strong>Call Us:</strong> +880-1891-82709</span>
                            </p>
                            </div>

                            <div className="col-md-4 col-sm-12" id="navbarToggler">
                                <div className="social-media-section align-right no-padding">
                        
                                    {/* Facebook */}
                                    <a className="btn-floating btn-fb mx-1" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-facebook rounded-box"> </i>
                                    </a>
                                    {/* Twitter */}
                                    <a className="tw-ic" href="https://www.twitter.com/" target="_blank" rel="noopener noreferer">
                                        <i className="fa fa-twitter rounded-box"> </i>
                                    </a>
                                    {/* Google+ */}
                                    <a className="gplus-ic" href="https://www.google.com/" target="_blank" rel="noopener noreferer">
                                        <i className="fa fa-google-plus rounded-box"> </i>
                                    </a>
                                    {/* Linkedin */}
                                    <a className="li-ic" href="https://www.youtube.com/" target="_blank" rel="noopener noreferer">
                                        <i className="fa fa-youtube rounded-box"> </i>
                                    </a>
                                    {/* Instagram */}
                                    <a className="ins-ic" href="https://www.instagram.com/" target="_blank" rel="noopener noreferer">
                                        <i className="fa fa-instagram rounded-box"> </i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        </nav>               
                    </div>
                </div>
        )
    }
}


export default SocialMedia