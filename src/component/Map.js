
// global Google
import React, { Component} from 'react';
import { withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
}
  from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center= {props.center}
    setCenter={ {lat: -34, lng: 151}}
    Marker={{position: {lat: -34, lng: 151}}}
  >
    {props.markers && props.markers.filter(marker => marker.isVisible).map((marker,idx) => {

        const venueInfo = props.venues.find(venue => venue.id === marker.id);

      return (
        <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }}
        onClick ={() => props.handleMarkerClick(marker)}
        // animation={array.props.length === 1 ? google.map.Animation.BOUNCE : google.maps.Animation.DROP}
        >

          {marker.isOpen && venueInfo.bestPhoto && (
            <InfoWindow>
                <div>
                  <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={"venue image"} />
                 <p>{venueInfo.name}</p>
                </div>
            </InfoWindow>
          )}
        </Marker>
      )
  })  }
  </GoogleMap>
))
)

class Map extends Component {
  render() {
    return(
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBFLMyrvoPSmsicmg9MA8nc3OHE2-HIQbQ"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`,width: `75%` }} role={"application"} aria-label={"map"} />}
        mapElement={<div style={{ height: `100%` }} />}
        role={"Google map"}
      />

    )
  }
}

export default Map
