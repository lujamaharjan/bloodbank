import React, { createContext, Component } from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      errors: {},
      isLoggedIn: localStorage.getItem('token') ? true : false,
      isDonor: false,
      isHospital: false,
      isSuperAdmin: false,
      userDetail: {},
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  loginUser = () => {
    this.setState({ isLoggedIn: true });
  };

  logoutUser = () => {
    this.setState(this.baseState);
    this.setState({ isLoggedIn: false });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isDonor');
    localStorage.removeItem('isHospital');
    localStorage.removeItem('isSuperAdmin');
    localStorage.removeItem('userDetails');
  };

  setUserId = (userId) => {
    this.setState({ id: userId });
  };

  setUserDetail = (data) => {
    this.setState({ userDetail: data });
  };

  setIsDonor = () => {
    this.setState({ isDonor: true });
  };

  setIsHospital = () => {
    this.setState({ isHospital: true });
  };

  setSuperUser = () => {
    this.setState({ isSuperAdmin: true });
  };

  //   resetState = () => {
  //     this.props.resetState()
  //   }

  componentDidMount = () => {
    this.setUserId(localStorage.getItem('userId'));
    this.setState({ isDonor: JSON.parse(localStorage.getItem('isDonor')) });
    this.setState({
      isHospital: JSON.parse(localStorage.getItem('isHospital')),
    });
    this.setState({
      isSuperAdmin: JSON.parse(localStorage.getItem('isSuperAdmin')),
    });
    this.setState({
      userDetail: JSON.parse(localStorage.getItem('userDetails')),
    });
  };

  render() {
    const value = { state: this.state, setState: this.setState };
    return (
      <UserContext.Provider
        value={{
          value,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser,
          setUserId: this.setUserId,
          setUserDetail: this.setUserDetail,
          setIsDonor: this.setIsDonor,
          setIsHospital: this.setIsHospital,
          setSuperUser: this.setSuperUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
