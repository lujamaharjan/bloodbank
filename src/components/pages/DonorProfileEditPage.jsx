import React, { Component } from 'react';

import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Footer from '../layouts/Footer';
import EditUser from '../user/EditUser';

class DonorProfileEditPage extends Component {
  render() {
    return (
      <>
        <SocialMedia />
        <Navigation />
        <EditUser></EditUser>
        <Footer />
      </>
    );
  }
}

export default DonorProfileEditPage;
