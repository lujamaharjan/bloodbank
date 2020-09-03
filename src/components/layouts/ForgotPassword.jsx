import React, { Component } from "react"
import Navigation from "../layouts/Navigation"
import SocialMedia from "../layouts/SocialMedia"
import Footer from "../layouts/Footer"
import axios from "axios"
import BASE_URL from "../../url"
import classnames from "classnames"

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {},
  }
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  onFormSubmit = async (e) => {
    e.preventDefault()
    const { email, errors } = this.state
    if (email === "") {
      this.setState({ errors: { email: "Email is Required!" } })
      return
    }
    const newEmail = {
      email: this.state.email,
    }
    await axios.post(`${BASE_URL}/password_reset/`, newEmail).then((res) => {
      if (res.status === 200) {
        alert("Check your email to reset password.")
      } else {
        alert("Something went wrong.")
      }
    })
    this.setState({
      email: "",
      errors: {},
    })
  }

  render() {
    const { email, errors } = this.state
    return (
      <div>
        <SocialMedia />
        <Navigation />
        <div className="container ">
          <div className="row">
            <div className="col-md-6 login-container  card">
              <div className="card-body">
                <h3 className="text-center">Change Password</h3>
                <form
                  className="login-form"
                  onSubmit={this.onFormSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      className={classnames("form-control", {
                        "is-invalid": errors.email,
                      })}
                      placeholder="Enter Your Email Address"
                      name="email"
                      onChange={this.onInputChange}
                      value={email}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default ForgotPassword
