import React, { Component } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, withRouter } from "react-router-dom";
import ChangePassword from "./ChangePassword";

class EditHospital extends Component {
  state = {
    selected: 0,
    full_name: "",
    email: "",
    address: "",
    contact_number: "",
    DOB: "",
    gender: "male",
    blood_group: "O+",
    profile_picture: null,
    errors: {},
  }

  render() {
    const { selected } = this.state
    return (
      <UserContext.Consumer>
        {(context) => {
          return (
            <div className="EditDetail mt-4">
              <div className="btn-section text-center mt-4">
                <Link
                  className="btn active"
                  onClick={(e) => {
                    this.changeSelected(e, 0)
                  }}
                >
                  Edit User Details
                </Link>
                <Link
                  className="btn"
                  onClick={(e) => {
                    this.changeSelected(e, 1)
                  }}
                  to=""
                >
                  Change Password
                </Link>
              </div>
              {selected === 1 && <ChangePassword />}
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

export default EditHospital
