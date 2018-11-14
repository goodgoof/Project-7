import React, {Component} from 'react';
import VenueList from "./VenueList.js";
import {slide as Venue} from "react-burger-menu";
// import MeterialUI from "@material-ui/core";
export default class SideBar extends Component {
  constructor() {
    super();
    this.state ={
      query: "",
      venues: [],
      // isToggle: true
    };
  }
  handleFilterVenues=() => {
    if(this.state.query.trim() !== ""){
      const venues= this.props.venues.filter(venue => venue.name.toLowerCase()
    .includes(this.state.query.toLowerCase())
  );
  return venues;
    }
    return this.props.venues;

  }

  //   toggleVenueList(){
  //     this.setState({
  //       isToggle: true
  //   })
  // }
  //   this.setState({isToggle: !this.state.isToggle})
  // }

  handleChange = e => {
    this.setState({query: e.target.value});



    const markers = this.props.venues.map(venue => {
      const isWatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if(isWatched){
        marker.isVisible =true;
      } else{
        marker.isVisible= false;
      }
      return marker;
    })
    this.props.updateSuperState({markers})
  };
  render (){
    return (
      <div className='sidebar'>
        <input type={"search"} is ={'search'} placeholder={"filter venues"} role={"Search box"}
      onChange ={this.handleChange}
      />
        <VenueList {...this.props}
        venues={this.handleFilterVenues()}
        handleListItemClick={this.props.handleListItemClick}/>
      </div>

    )
  }
}
