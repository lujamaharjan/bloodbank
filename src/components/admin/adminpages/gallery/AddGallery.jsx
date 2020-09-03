import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

import BASE_URL from '../../../../url';
import classnames from 'classnames';

class AddGallery extends Component {
    state ={
        image: null,
        title: "",
        error: {}
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };

      handleSubmit = async(e) =>{
        e.preventDefault();
        const title = this.state.title;
        if (title === ""){
            this.setState({error:{title:"Title is Required"}})
            return;
        }
        const image = this.state.image;
        if (image === null){
            this.setState({error:{title:"Image is Required!"} })
            return;
        }
        const formData = new FormData();
        formData.append("title",title)
        formData.append("image",image, image.name)
        const res = await axios.post(`${BASE_URL}/gallery/`, formData, {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          })

        console.log(res)
        this.setState({
            title: '',
            image: null,
            error: {}
        })
        this.props.history.push('/bloodbank/dashboard/gallery')
        if(res.status === 201)
            toast.success("Gallery image add sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
        else
            toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
        window.location.reload(false);
      }
    render(){
        return (
            <div className="add-gallery container mx-auto">
                <h4 className="py-4">Add Image To Gallery</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" 
                        name="title" 
                        className={classnames('form-control' ,'form-control-sm',{'is-invalid':this.state.error.title})}
                        onChange={this.handleChange}/>
                        {this.state.error.title &&
                            <div className="invalid-feedback">{this.state.error.title}</div>
                        }
                    </div>
                    <div className="form-group">
                        <input type="file" name="image" onChange={this.handleImageChange}  accept="image/*"/>
                        {this.state.error.image &&
                            <div className="invalid-feedback">{this.state.error.image}</div>
                        }
                    </div>
                    <button type="submit" className="btn btn-danger">Add</button>
                </form>
            </div>
        )
    }  
 
}

export default AddGallery
