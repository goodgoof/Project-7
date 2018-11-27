import React, { Component } from 'react';
import MapContainer from './component/Map.js'
import  locations from './data/locations.json';
import ParkList from './component/ParkList.js'
import SideMenu from './component/SideBar.js'


class App extends Component {
  state ={
    initialCenter: {lat: 41.0050977, lng: -73.7845768 },
    zoom: 12,
    all:locations
  }
  componentDidMount() {
    console.log(this.props)
  }

  componentWillMount=() =>{
    this.setState({
      staticLocations: locations,
      fluidLocations: locations
    });
  }


filterQuery = e =>{
  console.log(e.target.value)
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
  listItemClick = location => {
    console.log('Where is the location', location)
   // const marker=this.state.markers.find(marker => marker.name === location.name);
   // this.props.filterQuery()
   // this.props.onMarkerClick(marker)
//
 }


  render() {
    return(
      <div className="App" >
        <SideMenu locations = {this.state.fluidLocations}
           handleListitemClick = {this.filterQuery}
           listItemHandler={this.listItemClick}/>
        <MapContainer
            locations={this.state.all}
            />
      </div>
    )
  }

}

export default App;
