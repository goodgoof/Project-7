import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import  locations from '../data/locations.json';
import ParkList from './ParkList.js'
// import {Icons} from '@material-ui/icons'
import "../App.css";



const mapStyles = {
  height: '100%',
  width: '75%',
  right: 0
};

export class MapContainer extends Component {
  state ={
    map: null,
    markers: [],
    markerProps:[],
    showInfoWindow: false, // toggles between hide and show
    activeMarker: null, //shows active marker on click
    selectedPlace: null,
    all: locations
  }

  mapReady =(props, map) =>{
    this.setState({map});
    this.upDateMarkers(this.props.locations);
  }

  upDateMarkers = (locations) => {
    if(!locations)
     return;
     //remove markers present
    this.state.markers.map(marker=> marker.setMap(null))
  }

  onMarkerClick =(props,marker,e) =>{
    //close any open InfoWindow
    this.onClose();
    //then set the state for new markers InfoWindow
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

    onClose = props => {
      if(this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }

    let selectedPlace=[];
      let markers = locations.map((location, index) => {
        let sPlace ={
          key: index,
          index,
          name:location.name,
          placement: location.pos,
          url: location.url
        };

        selectedPlace.push(sPlace);

        let marker = new this.props.google.maps.Marker({
          position: location.pos,
          map:this.setState.map,
          animation: this.props.google.maps.Animation.DROP
        });

        // marker.addListener('click', toggleBounce);
        //
        //  toggleBounce=() => {
        //     if (marker.getAnimation() !== null) {
        //       marker.setAnimation(null);
        //     } else {
        //       marker.setAnimation(google.maps.Animation.BOUNCE);
        //     }


            return marker;
          })

          this.setState({markers, selectedPlace});

}
  render() {
    return (
      <div>
        <header>
          <h1 className="title"> Parks and Hiking Trails, Scarsdale NY </h1></header>

        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 40.9757,
            lng: -73.7546
          }}
          onReady={this.mapReady}
          icon= 'pin.png'
          className="mapBox"
          role ="application"
          aria-role="map"
          onClick={this.onClose}
        >
          <Marker
            onClick={this.onMarkerClick}
            />

          <InfoWindow
              marker= {this.state.activeMarker}
              visible= {this.state.showingInfoWindow}
              onClose= {this.onClose}
          >

            <div>
              <h4> {this.state.selectedPlace && this.state.selectedPlace.name}</h4>
                   {this.state.selectedPlace && this.state.selectedPlace.url ?
                     (<a href={this.state.selectedPlace.url}>Click here for website</a>) : "website not found"}
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
