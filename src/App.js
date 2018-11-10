import React, { Component} from 'react';
import Map from "./component/Map.js"
import SquareAPI from "./API/index.js"

class App extends Component {

  constructor(){
    super();
    this.state ={
      venues: [],
      markers: [],
      defaultCenter:{lat: 41.0050977, lng: -73.7845768 },
      center:[],
      zoom: 12
    };
  }

  handleMarkerClick =marker => {
    marker.isOpen= true;
    this.setState({markers:Object.assign(this.state.markers,marker)})
  }
  componentDidMount(){
    SquareAPI.search({
      near: "Jersey City NJ",
      query: "tacos",
      limit: 10


    })
    .then(results => {
      console.log(results)
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat:venue.location.lat,
          lng: venue.location.lng,
          isOpen:false,
          isVisible: true
        };
      });
      this.setState({venues, center, markers});

    });
  }
  render(){
    return (
      <div className ="App">
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>
    )
  }
}

export default App
