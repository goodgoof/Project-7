import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { locations } from "../data/locations.js";
import ParkList from "./ParkList.js";
// import {Icons} from '@material-ui/icons'
import "../App.css";

const mapStyles = {
  height: "100%",
  width: "100%",
  right: 0
};

export class MapContainer extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    showInfoWindow: false, // toggles between hide and show
    activeMarker: null, //shows active marker on click
    selectedPlace: null, //activemarkerprops
    all: locations
  };

  mapReady = (props, map) => {
    this.setState({ map });
    // this.upDateMarkers(this.props.locations);
  };

  // upDateMarkers = locations => {
  //   if (!locations) return;
  //   //remove markers present
  //   this.state.markers.forEach(marker => marker.setMap(null));
  // };

  onMarkerClick = (props, marker, e) => {
    console.log(marker);
    //close any open InfoWindow
    this.onClose();
    //then set the state for new markers InfoWindow
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  componentWillMount = () => {
    let markers = this.props.locations.map((location, index) => {
      const marker = {
        key: index,
        index,
        name: location.name,
        position: { lat: location.pos.lat, lng: location.pos.lng },
        url: location.url
      };
      return marker;
    });

    this.setState({ markers });
  };

  render() {
    return (
      <div>
        <header>
          <h1 className="title"> Parks and Hiking Trails, Scarsdale NY </h1>
        </header>

        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 40.9757,
            lng: -73.7546
          }}
          onReady={this.mapReady}
          icon="pin.png"
          className="mapBox"
          role="application"
          aria-role="map"
          onClick={this.onClose}>
          {this.state.markers.map(marker => (
            <Marker
              key={marker.index}
              position={marker.position}
              name={marker.name}
              onClick={e => this.onMarkerClick(marker, e)}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>
            <div>
              <h4> {this.state.markerProps && this.state.markerProps.name}</h4>
              {this.state.markerProps && this.state.markerProps.url ? (
                <a href={this.state.markerProps.url}>Click here for website</a>
              ) : (
                "website not found"
              )}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBFLMyrvoPSmsicmg9MA8nc3OHE2-HIQbQ"
})(MapContainer);
