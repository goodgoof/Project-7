import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import  locations from '../data/locations.json';
import ParkList from './ParkList.js'
// import {Icons} from '@material-ui/icons'
import "../App.css";



const mapStyles = {
  height: '100%',
  width: '100%',
  position:'fixed'
  // right: 0
};

export class MapContainer extends Component {
  state ={
    map: null,
    markers: [],
    markerProps:[],
    showInfoWindow: false, // toggles between hide and show
    activeMarker: {}, //shows active marker on click
    selectedPlace: {}, //activemarkerprops
    all: locations
  }


  componentDidMount=() => {
  }

  mapReady =(props, map) =>{
    this.setState({map});
    // this.upDateMarkers(this.props.locations);
  }

  // upDateMarkers = (locations) => {
  //   if(!locations)
  //    return;
  //    //remove markers present
  //   this.state.markers.forEach(marker=> marker.setMap(null))
  //
  //   let markerProps=[];
  //     let markers = locations.map((location, index) => {
  //       let mProps ={
  //         key: index,
  //         index,
  //         name:location.name,
  //         placement: location.pos,
  //         url: location.url
  //       };
  //
  //       markerProps.push(mProps);
  //
  //       let marker = new this.props.google.maps.Marker({
  //         position: location.pos,
  //         map:this.state.map,
  //         animation: this.props.google.maps.Animation.DROP,
  //       });
  //
  //       marker.addListener('click', () =>{
  //         this.onMarkerClick(mProps, marker, null)
  //         console.log(mProps)
  //       });
  //
  //           return marker;
  //         })
  //
  //         this.setState({markers, markerProps});
  //
  //       }

        componentDidMount = () => {
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

  onMarkerClick =(props,marker,e) =>{
    //close any open InfoWindow
    this.onClose();
    //then set the state for markers InfoWindow
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
    }

  render() {
    return (
      <div>
      <header>
          <h1 className="title"
          // style={mapStyles.width}
          > Parks and Hiking Trails, Scarsdale NY
          </h1>
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
          icon= 'pin.png'
          className="mapBox"
          role ="application"
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
              marker= {this.state.activeMarker}
              visible= {this.state.showingInfoWindow}
              onClose= {this.onClose}
          >

            <div>
              <h4> {this.state.selectedPlace.name}</h4>
                   {this.state.markerProps && this.state.markerProps.url ?
                     (<a href={this.state.markerProps.url}>Click here for website</a>) : "website not found"}
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
