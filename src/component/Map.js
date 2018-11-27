import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import  locations from '../data/locations.json';
import ParkList from './ParkList.js'
// import {Icons} from '@material-ui/icons'
import "../App.css";
// import Styles from './mapStyles.js'

const keys = {
      client_id: "YVZELKQDJWG1CRDPGZNFU4YJAYSDNIRKTPQJIERFCGX3TFFI",
      client_secret: "ONIWQ5C41NUEZILHWRPZD0EQRDTILKOR5R4YNEWBZISRGIFH",
      v: "20181108"
    };

    window.gm_authFailure=()=>{
         alert('The site failed to load. Please try again later.')
      };


const mapStyles = {
  height: '100%',
  width: '100%',
  // position:'fixed',
  // margin: '80px'
}

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
      this.upDateMarkers(this.props.locations);
    }

    upDateMarkers = (locations) => {
      if(!locations)
       return;
       //remove markers present
      this.state.markers.forEach(marker=> marker.setMap(null))

      //adding foursquare data

      let url = 'https://api.foursquare.com/v2/photos/PHOTO_ID'

      let markerProps=[];
        let markers = locations.map((location, index) => {
          let mProps ={
            key: index,
            index,
            name:location.name,
            placement: location.pos,
            url: location.url
          };

          markerProps.push(mProps);

          let marker = new this.props.google.maps.Marker({
            name: location.name,
            position: location.pos,
            map:this.state.map,
            animation: this.props.google.maps.Animation.DROP,
          });

          marker.addListener('click', () =>{
            this.onMarkerClick(mProps, marker, null)
            console.log(mProps)
          });

              return marker;
            })

            this.setState({markers,markerProps});

          }


    listItemClick =location => {
         const marker=this.state.markers.find(marker => marker.name === location.name);
         this.onMarkerClick(marker)

    }

    getParkInfo =(props, data) => {
      return data.response.venues
      .filter(item => item.name.includes(props.name) || props.name.includes(item.name))
    }

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
          activeMarker: null,
          selectedPlcae: null
        });
      }
    }

  render() {
    return (
      <div>

        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 40.9757,
            lng: -73.7546
          }}
          onReady={this.mapReady}
          className="mapBox"
          role ="application"
          aria-role="map"
          onClick={this.onClose}
          styles ={ [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
      }
          >


            <InfoWindow
                marker= {this.state.activeMarker}
                visible= {this.state.showingInfoWindow}
                onClose= {this.onClose}>

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
