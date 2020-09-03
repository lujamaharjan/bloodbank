
import React from 'react';
import Navigation from '../layouts/Navigation';
import SocialMedia from '../layouts/SocialMedia';
import Banner from '../layouts/Banner';
import SearchDonor from '../layouts/SearchDonor';
import IntroSection from '../layouts/IntroSection';
import Gallery from '../layouts/Gallery';
import Volunteers from '../layouts/Volunteers';
import Footer from '../layouts/Footer';


function Home() {
    return (
        <>
            <SocialMedia />
            <Navigation />
            <Banner />
            <SearchDonor/>
            <IntroSection />
            <Gallery />
            <Volunteers />
            <Footer />
        </>
    )
}

export default Home
