import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';
import ParkList from './ParkList.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default class SideMenu extends Component {
  state ={
    query: "",
    locations: []
  }

  updateQuery =(newQuery) => {
    {this.setState({query: newQuery.trim()})}

  }

  // handleChange = e => {
  //   this.setState({query: e.target.value});
  //   const markers = this.props.locations.map(location => {
  //     const isWatched = location.name.toLowerCase().includes(e.target.value.toLowerCase());
  //     const marker = this.props.markers.find(marker => marker.id === location.id);
  //     if(isWatched){
  //       marker.isVisible =true;
  //     } else{
  //       marker.isVisible= false;
  //     }
  //       return marker
  //   })
  //   this.props.updateSuperState({markers})
  // };

  render(){

    return(

        <div className="sidemenu">
          <input
            type={"text"}
            value={this.state.query}
            is ={'search'}
            aria-label={"Search Parks"}
            placeholder="Search Parks"
            />
            // onChange={() => this.updateQuery}/>
          <ParkList />
        </div>
    
    )
  }
}
