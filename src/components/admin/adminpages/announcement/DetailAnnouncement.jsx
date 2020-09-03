import React, { Component } from 'react'
import axios from 'axios';
import BASE_URL from '../../../../url';

class DetailAnnouncement extends Component {
    state = {
        title: "",
        body: "",
        image: null
    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/announcement/${id}/`);
        this.setState({
            title: res.data.title,
            body: res.data.body,
            image: res.data.feature_image
        })
    }
    render() {
        const {title, body, image} = this.state;
        return (
            <div className="announcement-detail">
                <h4>{title} </h4>
                <div class="imagediv">
                    <img src={image} alt=""/>
                </div>

                <p>
                    {body}
                </p>
            </div>
        )
    }
}


export default DetailAnnouncement;
