import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import  locations from './data/places.json';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state ={
    map: null,
    markers: [],
    showInfoWindow: false, // toggles between hide and show
    activeMarker: {}, //shows active marker on click
    selectedPlace: {}
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

  render() {
    return (
      <div>
        <header>
          <h1> Hiking Trails,Scarsdale NY </h1>
        </header>

        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 40.9757,
            lng: -73.7546
          }}
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
              onClose= {this.state.onClose}
          >
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
