import React from "react";
import { Map, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { MapStyle, MapDivStyle } from "./mapStyles.js";
import "../App.css";

window.gm_authFailure = () => {
  alert("The site failed to load. Please try again later.");
};

const MapContainer =(props) => {
    return (
      <div>
        <Map
          google={props.google}
          zoom={props.zoom}
          style={MapDivStyle}
          initialCenter={props.initialCenter}
          onReady={props.mapReady}
          className="mapBox"
          role="application"
          onClick={props.onClose}
          styles={MapStyle}>
          <InfoWindow
            marker={props.activeMarker}
            visible={props.showingInfoWindow}
            onClose={props.onClose}>
            <div>
              <h4>
                {" "}
                {props.selectedPlace && props.selectedPlace.name}
              </h4>
              {props.selectedPlace && props.selectedPlace.url ? (
                <a href={props.selectedPlace.url}>
                  Click here for website
                </a>
              ) : (
                "website not found"
              )}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBFLMyrvoPSmsicmg9MA8nc3OHE2-HIQbQ"
   })(MapContainer);
