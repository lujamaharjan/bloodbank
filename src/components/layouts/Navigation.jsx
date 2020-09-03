import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import LoginButton from "./LoginButton";
import { UserContext } from "../../context/UserContext";

class Navigation extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {(context) => (
          <Consumer>
            {(value) => {
              //check If user Is logged in or not from user context
              const { isLoggedIn, id } = context.value.state;
              // get Logo of BloodBank
              const { bloodbankinfo } = value;
              return (
                <div className="container white-background">
                  <nav className="navbar navbar-expand-lg navbar-light menu-nav-bar">
                    <img
                      className="navbar-brand"
                      src={bloodbankinfo.logo_black}
                      alt="logo"
                    />
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse "
                      id="navbarNavDropdown"
                    >
                      <ul className="navbar-nav align-right ">
                        <li className="nav-item">
                          <Link className="nav-link" to="/">
                            HOME{" "}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/about-us">
                            ABOUT US
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/announcement">
                            ANNOUCEMENT
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/contact-us">
                            CONTACT
                          </Link>
                        </li>
                        {isLoggedIn && (
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={`/donor/detail/${id}`}
                            >
                              PROFILE
                            </Link>
                          </li>
                        )}
                        <li className="nav-item">
                          <LoginButton></LoginButton>
                        </li>

                        {/* Render if user is not logged in  */}
                        {!isLoggedIn && (
                          <li className="nav-item">
                            <p
                              className="nav-link dropdown-toggle"
                              style={{ cursor: "pointer" }}
                              id="navbarDropdown"
                              role="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              REGISTER
                            </p>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              <Link
                                className="dropdown-item"
                                to="/donor/registration"
                              >
                                As Donor
                              </Link>
                              <div className="dropdown-divider"></div>
                              <Link
                                className="dropdown-item"
                                to="/hospital/registration"
                              >
                                As Hospital
                              </Link>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </nav>
                </div>
              );
            }}
          </Consumer>
        )}
      </UserContext.Consumer>
    );
  }
}
export default Navigation;
