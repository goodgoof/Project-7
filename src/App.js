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

  listItemClick =location => {
   const marker=this.state.markers.find(marker => marker.id === location.id);
   this.props.handleMarkerClick(marker)
//
 }


  render() {
    return(
      <div className="App" >
        <SideMenu />
        <MapContainer
            locations={this.state.all}
            />
      </div>
    )
  }

}

export default App;
