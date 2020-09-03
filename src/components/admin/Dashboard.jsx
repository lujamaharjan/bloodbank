import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import AdminHeader from './AdminHeader';
import SideBar from './SideBar';
import MobileNavigation from './MobileNavigation';

import Graphs from './Graphs';
import AdminSlider from './adminpages/slider/AdminSlider';
import UpdateSlider from './adminpages/slider/UpdateSlider';

import AdminGallery from './adminpages/gallery/AdminGallery';
import AddGallery from './adminpages/gallery/AddGallery';
import UpdateGallery from './adminpages/gallery/UpdateGallery';

import AdminDonors from './adminpages/donors/AdminDonors';
import AddDonors from './adminpages/donors/AddDonors';
import UpdateDonor from './adminpages/donors/UpdateDonor';
import DonorDetails from './adminpages/donors/DonorDetails';

import './admin.css';
import AdminBloodBank from './adminpages/bloodbank/AdminBloodBank';
import AdminBloodBankUpdate from './adminpages/bloodbank/AdminBloodBankUpdate';
import BloodBankDetail from './adminpages/bloodbank/BloodBankDetail';

import AdminVolunteers from './adminpages/volunteers/AdminVolunteers';
import AdminVolunteerUpdate from './adminpages/volunteers/AdminVolunteerUpdate';
import AdminVolunteerAdd from './adminpages/volunteers/AdminVolunteerAdd';
import AdminVolunteerDetail from './adminpages/volunteers/AdminVolunteerDetail';

import AnnouncementLists from './adminpages/announcement/AnnouncementLists';
import AddAnnouncement from './adminpages/announcement/AddAnnouncement';
import UpdateAnnouncement from './adminpages/announcement/UpdateAnnouncement';
import DetailAnnouncement from './adminpages/announcement/DetailAnnouncement';

import AdminHospital from './adminpages/hospital/AdminHospital';
import AddHospital from './adminpages/hospital/AddHospital';
import UpdateHospital from './adminpages/hospital/UpdateHospital';
import DetailHospital from './adminpages/hospital/DetailHospital';

import SponsorAdmin from './adminpages/sponsor/SponsorAdmin';
import SponsorDetail from './adminpages/sponsor/SponsorDetail';
import UpdateSponsorAdmin from './adminpages/sponsor/UpdateSponsorAdmin';
import AddSponsorAdmin from './adminpages/sponsor/AddSponsorAdmin';

import campaignAdmin from './adminpages/campaign/CampaignAdmin';
import AddCampaign from './adminpages/campaign/AddCampaign';
import UpdateCampaign from './adminpages/campaign/UpdateCampaign';
import CampaignDetail from './adminpages/campaign/CampaignDetail';

import Stock from './adminpages/stock/Stock';
import AddStock from './adminpages/stock/AddStock';
import UpdateStock from './adminpages/stock/UpdateStock';

import Request from './adminpages/request/Request';

class Dashboard extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className='dashboard'>
            <SideBar />
            <AdminHeader />
            <MobileNavigation />
            <div className='main-content'>
              <Switch>
                <Route exact path='/bloodbank/dashboard' component={Graphs} />
                <Route
                  exact
                  path='/bloodbank/dashboard/slider'
                  component={AdminSlider}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/slider/update/:id'
                  component={UpdateSlider}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/gallery'
                  component={AdminGallery}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/gallery/add'
                  component={AddGallery}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/gallery/update/:id'
                  component={UpdateGallery}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/donors'
                  component={AdminDonors}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/donors/add'
                  component={AddDonors}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/donors/update/:id'
                  component={UpdateDonor}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/donors/details/:id'
                  component={DonorDetails}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/bloodbank'
                  component={AdminBloodBank}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/bloodbank/:id/details'
                  component={BloodBankDetail}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/bloodbank/update/:id'
                  component={AdminBloodBankUpdate}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/announcements'
                  component={AnnouncementLists}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/announcements/add'
                  component={AddAnnouncement}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/announcements/edit/:id'
                  component={UpdateAnnouncement}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/announcements/details/:id'
                  component={DetailAnnouncement}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/volunteers'
                  component={AdminVolunteers}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/volunteer/update/:id'
                  component={AdminVolunteerUpdate}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/volunteer/add'
                  component={AdminVolunteerAdd}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/volunteer/detail/:id'
                  component={AdminVolunteerDetail}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/stock'
                  component={Stock}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/stock/add'
                  component={AddStock}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/stock/update/:id'
                  component={UpdateStock}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/hospital'
                  component={AdminHospital}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/hospital/update/:id'
                  component={UpdateHospital}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/hospital/add'
                  component={AddHospital}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/hospital/detail/:id'
                  component={DetailHospital}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/sponsor'
                  component={SponsorAdmin}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/sponsor/update/:id'
                  component={UpdateSponsorAdmin}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/sponsor/add'
                  component={AddSponsorAdmin}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/sponsor/detail/:id'
                  component={SponsorDetail}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/campaign'
                  component={campaignAdmin}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/campaign/update/:id'
                  component={UpdateCampaign}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/campaign/add'
                  component={AddCampaign}
                />
                <Route
                  exact
                  path='/bloodbank/dashboard/campaign/detail/:id'
                  component={CampaignDetail}
                />

                <Route
                  exact
                  path='/bloodbank/dashboard/requests'
                  component={Request}
                />
              </Switch>
            </div>
          </div>
          <ToastContainer />
        </React.Fragment>
      </Router>
    );
  }
}

export default Dashboard;
