import React, { Component} from 'react';
import Map from "./component/Map.js"
import SquareAPI from "./API/index.js"
import  "./index.css"
import SideBar from "./component/SideBar.js"
import {slide as Venue} from "react-burger-menu";
import BurgerMenu from "./component/BurgerMenu.js"

class App extends Component {

  constructor(){
    super();
    this.state ={
      venues: [],
      markers: [],
      defaultCenter:{lat: 41.0050977, lng: -73.7845768 },
      center:[],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj)
      },
      // showMenu: true
    };
  }

//   toggleMenu() {
//     this.state.showMenu = !this.state.showMenu //Flips true/false
// }

  closeAllMarkers =() => {
    const markers =this.state.markers.map(marker => {
      marker.isOpen=false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  };
  handleMarkerClick =marker => {
    this.closeAllMarkers();
    console.log(marker)
    marker.isOpen= true;
    this.setState({markers:Object.assign(this.state.markers,marker)})
    const venue=this.state.venues.find(venue => venue.id ===marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue =Object.assign(venue, res.response.venue)
      this.setState({venues:Object.assign(this.state.venues,newVenue)})
      console.log(newVenue)
    });

  }

  handleListItemClick =venue => {
    const marker=this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker)

  }

  componentDidMount(){
    SquareAPI.search({
      near: "Jersey City NJ",
      query: "tacos",
      limit: 10


    })
    .then(results => {
      console.log(results)
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat:venue.location.lat,
          lng: venue.location.lng,
          isOpen:false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({venues, center, markers});

    })
    .catch(error => alert("Sorry, the page could not load"));
  }


  render(){
    return (
      <div className ="App flex-container">
        <SideBar className="item-1" {...this.state} handleListItemClick={this.handleListItemClick}  />
        <BurgerMenu  onClick={this.props.toggleOpen}/>
        <Map className="item-2" {...this.state} handleMarkerClick={this.handleMarkerClick} role={"google map"}/>
      </div>
    )
  }
}

export default App
