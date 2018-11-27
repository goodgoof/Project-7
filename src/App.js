import React, { Component } from 'react';
import MapContainer from './component/Map.js'
import  locations from './data/locations.json';
import ParkList from './component/ParkList.js'
import SideMenu from './component/SideBar.js'


class App extends Component {
  state ={
    parks: [],
    markers:[],
    initialCenter: {lat: 41.0050977, lng: -73.7845768 },
    zoom: 12,
    all:locations
  }

  componentWillMount=() =>{
    this.setState({
      staticLocations: locations,
      fluidLocations: locations
    });
  }


filterQuery = e =>{
  const query = e.target.value;
  const tempArray =[];
  if(query === "") {
    this.setState({fluidLocations: this.state.staticLocations});
  } return;
   this.state.staticLocations.map(location =>{
     if(location.name.toLowerCase().includes(query.toLowerCase())){
       tempArray.push(location);
     }
   });
   this.setState({
     fluidLocations: tempArray
   });

}
  listItemClick =location => {
   const marker=this.state.markers.find(marker => marker.id === location.id);
   this.props.onMarkerClick(marker)
//
 }


  render() {
    return(
      <div className="App" >
        <SideMenu locations = {this.state.fluidLocations}
           handleListitemClick = {this.listItemClick}/>
        <MapContainer
            locations={this.state.all}
            />
      </div>
    )
  }

}

export default App;
