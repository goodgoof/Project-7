import React, { Component} from 'react';
import Map from "./component/Map.js"
import SquareAPI from "./API/index.js"

class App extends Component {

  constructor(){
    super();
    this.state ={
      venues: [],
      markers: [],
      center:[],
      zoom: 12
    };
  }
  componentDidMount(){
    SquareAPI.search({
      near: "Scarsdale NY",
      query: "tacos",
      limit: 10
    }).then(results => {
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
        <Map {...this.state}/>
      </div>
    )
  }
}

export default App
