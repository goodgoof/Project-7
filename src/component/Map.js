import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import  locations from '../data/locations.json';
import ParkList from './ParkList.js'
// import {Icons} from '@material-ui/icons'



const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state ={
    map: null,
    markers: [],
    markerProps:[],
    showInfoWindow: false, // toggles between hide and show
    activeMarker: {}, //shows active marker on click
    selectedPlace: {},
    all: locations
  }

  mapReady =(props, map) =>{
    this.setState({map});
    this.upDateMarkers(this.props.locations);
  }

  upDateMarkers = locations => {
    this.state.markers.map(marker=> marker.setMap(null))
  }

  onMarkerClick =(props,marker,e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props =>{
      if(this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    }
    // // const markerProps=[]
    // let markers = locations.map(location, key) => {
    //   let mProps ={
    //     key: key,
    //     index:,
    //     name:locations.name,
    //     placement: locations.pos,
    //     url: locations.url
    //   };
    //   markersProps.push(mProps);
    //
    //   let marker => new this.props.google.maps.Marker({
    //     position: locations.pos,
    //     map:this.setState.map,
    //     animation: google.maps.Animation.DROP
    //
    //   });
    //   marker.addListener('click', toggleBounce);
    //    toggleBounce => () {
    //       if (marker.getAnimation() !== null) {
    //         marker.setAnimation(null);
    //       } else {
    //         marker.setAnimation(google.maps.Animation.BOUNCE);
    //       }
    //
    //
    //   return marker;
    // }
    //


  render() {
    return (
      <div>
        <header>
          <h1> Hiking Trails,Scarsdale NY </h1></header>
          <input type={"search"} is ={'search'} aria-label={"Search parks"} placeholder={"search"} />

        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 40.9757,
            lng: -73.7546
          }}
          icon= 'pin.png'
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'Weinberg Nature Center'}
            lat={ 40.9757}
            lng={ -73.7546}
            />

          <InfoWindow
              marker= {this.state.activeMarker}
              visible= {this.state.showingInfoWindow}
              onClose= {this.onClose}
          >

          <ParkList locations={locations}/>
            <div>
              <h4> {this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
          </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBFLMyrvoPSmsicmg9MA8nc3OHE2-HIQbQ'
})(MapContainer);
