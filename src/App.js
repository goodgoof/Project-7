import React, { Component } from "react";
import MapContainer from "./component/Map.js";
import axios from "axios";
import SideMenu from "./component/SideBar.js";
import Header from "./component/Header.js";
import sortBy from 'sort-by';

class App extends Component {
  state = {
    open: false,
    initialCenter: { lat: 40.9867, lng: -73.8 },
    zoom: 15,
    staticLocations: [],
    fluidLocations: [],
    query: "",
    map: null,
    markers: [],
    markerProps: [],
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  //app loads MyJson api's response to state. code snippet by project coach Jason Michael White and Doug Brown on request to fix errors.
  componentDidMount = () => {
    axios.get("https://api.myjson.com/bins/1397ne").then(res => {
      const locations = [...res.data];
      this.setState({
        staticLocations: locations,
        fluidLocations: locations
      });
    }).catch(error => alert("Sorry, the page could not load. Please try again later."));
  }; //error response for failed API

  // map invokes updatemarkers and passes fluidlocations in state
  mapReady = (props, map) => {
    this.setState({ map }, () => {
      this.upDateMarkers(this.state.fluidLocations);
    });
  };
  upDateMarkers = locations => {
    if (!locations) return;
    //remove markers present
    //iterate thru markers and set map to null
    this.state.markers.forEach(marker => marker.setMap(null));
    const bounds = new window.google.maps.LatLngBounds(); //bounds to contain map within lat lng

    let markerProps = [];
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        placement: location.pos,
        url: location.url
      };

      markerProps.push(mProps);

      let marker = new window.google.maps.Marker({
        name: location.name,
        position: new window.google.maps.LatLng(location.pos),
        map: this.state.map,
        animation: window.google.maps.Animation.DROP
      });
      bounds.extend(marker.position);
      marker.addListener("click", () => {
        this.onMarkerClick(mProps, marker, null);
      });

      return marker;
    });
    this.state.map.fitBounds(bounds);
    this.setState({ markers, markerProps });
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props);
    //close any open InfoWindow
    this.onClose();
    this.setState(
      {
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      },
      () => console.log(this.state)
    );
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlcae: null
      });
    }
  };
  //filter query searches park from list and also invokes the corresponding marker for that park
  filterQuery = e => {
    console.log(e.target.value);
    const query = e.target.value;
    const tempArr = [];
    if (query !== "") {
      this.state.staticLocations.forEach(location => {
        if (location.name.toLowerCase().includes(query.toLowerCase())) {
          tempArr.push(location);
        }
      });
      this.setState(
        {
          fluidLocations: tempArr
        },
        () => {
          this.filterMarkers(tempArr, query);
          console.log(this.state.fluidLocations);
        }
      );
    } else {
      this.setState({ fluidLocations: this.state.staticLocations });
    }
  };
  //filter markers based on query
  filterMarkers = (locations, query) => {
    if (query === "") {
      this.state.markers.map(marker => {
        return marker.setVisible(true);
      });
    } else {
      this.state.markers.forEach(marker => {
        marker.setVisible(false);
      });
      this.state.markers.forEach(marker => {
        locations.forEach(location => {
          if (marker.name === location.name) {
            marker.setVisible(true);
          }
        });
      });
    }
  };
  //update search field to new search
  updateQuery = newQuery => {
    this.setState({ query: newQuery.trim() });
  };

  resetQuery = () => {
     this.setState({query: ""})
   };

  // to open marker based on listitem click
  handleListitemClick = location => {
    const marker = this.state.markers.find(
      marker => marker.name === location.name
    );
    this.onMarkerClick(location, marker);
  };

  render() {
    this.state.staticLocations.sort(sortBy('name'))
    return (
      <div className="App">
          <Header />
          <SideMenu
            fluidLocations={this.state.fluidLocations}
            staticLocations={this.state.staticLocations}
            filterQuery={this.filterQuery}
            handleListitemClick={this.handleListitemClick}
            query={this.state.query}
          />
        <MapContainer
          zoom={this.state.zoom}
          initialCenter={this.state.initialCenter}
          fluidLocations={this.state.fluidLocations}
          mapReady={this.mapReady}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          showingInfoWindow={this.state.showingInfoWindow}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default App;
