import React, { Component } from 'react';
import axios from 'axios'

import BASE_URL from './url'


const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_GALLERY":
            return {
                ...state,
                gallery: action.payload
            }

        case "UPDATE_GALLERY":
            return {
                ...state,
                gallery: state.gallery.map(singleGall => singleGall.id === action.payload.id
                    ? (singleGall = action.payload)
                    : singleGall)
            }

        case "DELETE_GALLERY":
            return {
                ...state,
                gallery: state.gallery.filter(singleGall => singleGall.id !== action.payload)
            }
        case "UPDATE_BLOODBANK":
            return {
                ...state,
                bloodbankinfo: (state.bloodbankinfo.id === action.payload.id ? (state.bloodbankinfo = action.payload) : state.bloodbankinfo)
            }

        case "UPDATE_SLIDER":
            return {
                ...state,
                carousel: state.carousel.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }
        case "DONOR_DELETE":
            return {
                ...state,
                donors: state.donors.filter(donor => donor.id !== action.payload)
            }

        case "UPDATE_DONOR":
            return {
                ...state,
                donors: state.donors.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }

        case "CHANGE_DONOR":
            return {
                ...state,
                donors: action.payload
            }

        case "UPDATE_ANNOUNCEMENT":
            return {
                ...state,
                announcements: state.announcements.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }

        case "ANNOUNCEMENT_DELETE":
            return {
                ...state,
                announcements: state.announcements.filter(item => item.id !== action.payload)
            }

        case "CHANGE_ANNOUNCEMENT":
            return {
                ...state,
                announcements: action.payload
            }
        case "CHANGE_VOLUNTEER":
            return {
                ...state,
                volunteers: action.payload
            }

        case "UPDATE_VOLUNTEER":
            return {
                ...state,
                volunteers: state.volunteers.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }
        case "DELETE_VOLUNTEER":
            return {
                ...state,
                volunteers: state.volunteers.filter(donor => donor.id !== action.payload)

            }

        case "CHANGE_HOSPITAL":
            return {
                ...state,
                hospitals: action.payload
            }

        case "UPDATE_HOSPITAL":
            return {
                ...state,
                hospitals: state.hospitals.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }
        case "DELETE_HOSPITAL":
            return {
                ...state,
                hospitals: state.hospitals.filter(hospital => hospital.id !== action.payload)

            }

        case "CHANGE_SPONSOR":
            return {
                ...state,
                sponsors: action.payload
            }

        case "UPDATE_SPONSOR":
            return {
                ...state,
                sponsors: state.sponsors.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }
        case "DELETE_SPONSOR":
            return {
                ...state,
                sponsors: state.sponsors.filter(sponsor => sponsor.id !== action.payload)

            }

        case "CHANGE_CAMPAIGN":
            return {
                ...state,
                campaigns: action.payload
            }

        case "UPDATE_CAMPAIGN":
            return {
                ...state,
                campaigns: state.campaigns.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }
        case "DELETE_CAMPAIGN":
            return {
                ...state,
                campaigns: state.campaigns.filter(campaign => campaign.id !== action.payload)

            }

        case "UPDATE_STOCK":
            return {
                ...state,
                stocks: state.stocks.map(item => item.id === action.payload.id
                    ? (item = action.payload)
                    : item)
            }
        
        case "STOCK_DELETE":
            return {
                ...state,
                 stocks: state.stocks.filter(stock => stock.id !== action.payload)
    
            }

        case "CHANGE_STOCKS":
            return {
                ...state,
                stocks: action.payload
            }

        case "UPDATE_REQUESTS":
            return {
                ...state,
                requests: state.requests.filter(request => request.id !== action.payload)
        
         }

        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        gallery: [],
        galleryCount: null,

        carousel: [],

        donors: [],
        donorCount: null,

        bloodbankinfo: {},

        volunteers: [],
        volunteerCount: null,

        announcements: [],
        announcementCount: null,

        campaigns: [],
        campaignCount:null,

        bloodbanksocialmediaurl: {},

        hospitals: [],
        hospitalCount: null,

        sponsors: [],
        sponsorCount: null,

        stocks: [],
        stockCount: null,

        requests: [],
        requestCount: null,


        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }

    async componentDidMount() {

        const gallery = await axios.get(`${BASE_URL}/gallery/`)
        this.setState({ gallery: gallery.data.results })
        this.setState({ galleryCount: gallery.data.count })

        const bloodbankinfos = await axios.get(`${BASE_URL}/bloodbank/1`)
        this.setState({ bloodbankinfo: bloodbankinfos.data })

        const volunteer = await axios.get(`${BASE_URL}/volunteer/`)
        this.setState({ volunteers: volunteer.data.results })
        this.setState({ volunteerCount: volunteer.data.count })


        const announcement = await axios.get(`${BASE_URL}/announcement/`)
        this.setState({ announcements: announcement.data.results })
        this.setState({ announcementCount: announcement.data.count })

        const campaign = await axios.get(`${BASE_URL}/campaign/`)
        this.setState({ campaigns: campaign.data.results })
        this.setState({campaignCount:campaign.data.count})

        const bldbanksocial = await axios.get(`${BASE_URL}/bloodbanksocialmedia/1`)
        this.setState({ bloodbanksocialmediaurl: bldbanksocial.data })

        const carousel = await axios.get(`${BASE_URL}/carousel/`)
        this.setState({ carousel: carousel.data })

        const donors = await axios.get(`${BASE_URL}/donor-profile/`)
        this.setState({ donors: donors.data.results })
        this.setState({ donorCount: donors.data.count })

        const hospitals = await axios.get(`${BASE_URL}/hospital-profile/`)
        this.setState({ hospitals: hospitals.data.results })
        this.setState({ hospitalCount: hospitals.data.count })

        const sponsors = await axios.get(`${BASE_URL}/sponsor/`)
        this.setState({ sponsors: sponsors.data.results })
        this.setState({ sponsorCount: sponsors.data.count })

        const stocks= await axios.get(`${BASE_URL}/bloodpacket/`)
        this.setState({stocks: stocks.data.results})
        this.setState({stockCount:stocks.data.count})


        const requests = await axios.get(`${BASE_URL}/bloodrequest/`)
        this.setState({requests: requests.data.results})
        this.setState({requestCount:requests.data.count})

    }


    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }

}

export const Consumer = Context.Consumer;

