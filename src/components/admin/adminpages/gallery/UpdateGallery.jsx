import React, {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import classnames from 'classnames';
import {Consumer} from '../../../../context'
import BASE_URL from '../../../../url'

class UpdateGallery extends Component {
    state ={
        image: null,
        title: "",
        error: {}
    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/gallery/${id}/`);
        const gallery = response.data;
        console.log(gallery)
        this.setState({
            title: gallery.title,
            image: gallery.image
        })
    }
  
    handleChange = e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };

      handleSubmit = async(dispatch, e) => {
        e.preventDefault();

        const title = this.state.title;
        if (title ===""){
            this.setState({error:{title:"Title is Required"}})
            return;
        }
        const image = this.state.image;
        if (image === null){
            this.setState({error:{title:"Image is Required!"} })
            return;
        }
        const {id} = this.props.match.params;
        const formData = new FormData();
        formData.append("title",title)
        formData.append("image",image, image.name)
        const res = await axios.patch(`${BASE_URL}/gallery/${id}/`, formData,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          })

        dispatch({type: "UPDATE_GALLERY", payload: res.data})
        //clear state
        this.setState({
            title: '',
            image: null,
            error: {}
        })
        this.props.history.push('/bloodbank/dashboard/gallery')
        if(res.status === 200)
            toast.success("Gallery image Updated sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
        else
            toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
      }

    render(){
        const {title, error} = this.state
        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch} = value;
                        return(
                            <div className="add-gallery container mx-auto">
                                <h4 className="py-4">Update Gallery Image</h4>
                                <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" 
                                        name="title" 
                                        value={title}
                                        className={classnames('form-control' ,'form-control-sm',{'is-invalid':this.state.error.title})}
                                        onChange={this.handleChange}/>
                                        {error.title &&
                                            <div className="invalid-feedback">{error.title}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <input type="file"
                                        name="image" 
                                        onChange={this.handleImageChange}  
                                        accept="image/*"/>
                                        {error.image &&
                                            <div className="invalid-feedback">{error.image}</div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-danger">Update</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
            
        )
    }  
 
}

export default UpdateGallery

