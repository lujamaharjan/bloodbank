import React, { Component } from 'react';
import axios from 'axios'
import CKEditor from 'ckeditor4-react';
import classnames from 'classnames';
import {toast} from 'react-toastify'

import BASE_URL from '../../../../url'
import { Consumer } from '../../../../context';

 class UpdateAnnoumcement extends Component {
     state = {
         title: "",
         body: "",
         feature_image: null,
         errors:{}
     }

     
    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await axios.get(`${BASE_URL}/announcement/${id}/`,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        this.setState({
            title: response.data.title,
            body: response.data.body
        })
    }
  

     //handling change in the title field
    onChange = e => {
        this.setState({[e.target.name] : e.target.value});
     }

     //handle change in the image field
    onChangeImage = e => {
        this.setState({feature_image:e.target.files[0]})
     }

     //handle change in the body field
    onEditorChange = e => {
        this.setState({
            body: e.editor.getData()
        })
    }

    //handle form submit event
    handleSubmit = async (e, dispatch) => {
        e.preventDefault();
        const {title, body, feature_image} = this.state;

        if(title === ""){
            this.setState({ errors:{title: "Title is required!"}});
            return;
        }
        console.log(typeof(body))
        if(body === ""){
            this.setState({ errors:{body: "Body is required!"}});
            return;
        }
        
        if (feature_image === null){
            this.setState({ errors:{feature_image: "Image is required!"}});
            return;
        }
        

        const formData = new FormData();
        formData.append('title', title);
        formData.append("body", body);
        formData.append("feature_image", feature_image, feature_image.name);
        const {id} = this.props.match.params;
        try{
            await axios.put(`${BASE_URL}/announcement/${id}/`,formData,{
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                },
              })
            this.setState({
                title: "",
                body: "",
                image: null
            })
            toast.success("Announcement Update sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
            this.props.history.push('/bloodbank/dashboard/announcements')
            window.location.reload(false)
            
        }
        catch(err){
            toast.error("Opps, something went wrong!",{position: toast.POSITION.BOTTOM_RIGHT})
        }
        
        
        
    }

    render() {
        const {title, body, errors} = this.state;
        return(
            <Consumer>
                {
                    value =>{
                        
                        return(
                            <div className="container add-annoumcement">
                                <h4>Update Annoumcement</h4>
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text"  
                                        className={classnames('form-control',{'is-invalid':errors.title})}
                                        name="title" 
                                        value={title}
                                        onChange={this.onChange}/>
                                        {errors.title &&
                                            <div className="invalid-feedback">{errors.title}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="body">Body</label>
                                        <CKEditor
                                            data={body}
                                            onChange={this.onEditorChange}
                                        />
                                        {errors.body &&
                                            <div style={{fontSize:'13px', color:"red"}}>{errors.body}</div>
                                        }
                                    </div>
                                    <div className='form-group' style={{ margin: "30px 0" }}>
                                            <label htmlFor='feature_image'>Feature Image</label>
                                            <input 
                                            type='file' 
                                            className='form-control-file' 
                                            accept="image/*"  
                                            onChange={this.onChangeImage} />
                                            {errors.feature_image &&
                                            <div style={{fontSize:'13px', color:"red"}}>{errors.feature_image}</div>
                                            }
                                        </div>
                                    <button className="btn btn-danger" type="submit">Update</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
        
    }
}
export default UpdateAnnoumcement;