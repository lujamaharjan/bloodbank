import React, { Component } from 'react' 
import axios from 'axios';
import {toast} from 'react-toastify';
import classnames from 'classnames';
import BASE_URL from '../../../../url';
import { Consumer } from '../../../../context';

class UpdateSlider extends Component {
    state = {
        title: "",
        quote: "",
        image: "",
        error:{}
    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await axios.get(`${BASE_URL}/carousel/${id}`,{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            }
            });
        const slider = res.data;
        this.setState({
            title: slider.title,
            quote: slider.quote,
            image: slider.image
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


      updateSlider = async(dispatch, e) =>{
        e.preventDefault();
        const title = this.state.title;
        if (title ===""){
            this.setState({error:{title:"Title is Required"}})
            return;
        }

        const quote = this.state.quote;
        if (quote ===""){
            this.setState({error:{title:"Quote is Required"}})
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
        formData.append("quote", quote)
        formData.append("image",image, image.name)
        const res = await axios.put(`${BASE_URL}/carousel/${id}/`, formData);
        dispatch({type: "UPDATE_SLIDER", payload: res.data})
        //clear state
        this.setState({
            title: '',
            quote: '',
            image: null,
            error: {}
        })
        this.props.history.push('/bloodbank/dashboard/slider')
        if(res.status === 200)
            toast.success("Slider image Updated sucessfully!",{position: toast.POSITION.BOTTOM_RIGHT})
        else
            toast.error("Something went wrong",{position: toast.POSITION.BOTTOM_RIGHT} )
    }

    render() {
        const {title, quote, error} = this.state;
        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch} = value;
                        return(
                            <div className="container update-slider">
                                <form className="col-md-8 mx-auto" onSubmit={this.updateSlider.bind(this, dispatch)}>
                                    <h4>Update slider</h4>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input className={classnames("form-control from-control-sm",{'is-invalid':error.title})} 
                                        name="title" 
                                        value={title}
                                        onChange={this.handleChange}
                                        placeholder="Title"/>
                                         {error.title &&
                                            <div className="invalid-feedback">{error.title}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quote">Quote</label>
                                        <input  className={classnames("form-control from-control-sm",{'is-invalid':error.title})} 
                                        name="quote" 
                                        value={quote} 
                                        onChange={this.handleChange}
                                        placeholder="Quote"/>
                                         {error.title &&
                                            <div className="invalid-feedback">{error.quote}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <input type="file" 
                                        name="image" 
                                        onChange={this.handleImageChange} 
                                        accept="image/*"/>
                                        {error.title &&
                                            <div className="invalid-feedback">{error.image}</div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-info">Update</button>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
            
        )
    }
}


export default  UpdateSlider;
