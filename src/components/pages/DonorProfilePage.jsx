import React, { Component } from 'react';

import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer';
import ViewUser from '../user/ViewUser';
import { UserContext } from '../../context/UserContext';
import ViewHospital from '../user/ViewHospital';

class DonorProfilePage extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {(context) => {
          const { isDonor, isHospital } = context.value.state;
          return (
            <>
              <SocialMedia />
              <Navigation />
              {isDonor && !isHospital && <ViewUser></ViewUser>}
              {!isDonor && isHospital && <ViewHospital></ViewHospital>}
              <Footer />
            </>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default DonorProfilePage;
