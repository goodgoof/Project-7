import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';
import ParkList from './ParkList.js'


export default class SideMenu extends Component {
  state ={
    query: "",
    locations: []
  }

  updateQuery =(newQuery) => {
    {this.setState({query: 'newQuery'})}

  }

  handleChange = e => {
    this.setState({query: e.target.value});
    const markers = this.props.locations.map(location => {
      const isWatched = location.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === location.id);
      if(isWatched){
        marker.isVisible =true;
      } else{
        marker.isVisible= false;
      }
        return marker
    })
    this.props.updateSuperState({markers})
  };

  render(){
    return(
      <Menu>
        <div classname="sidemenu">
          <input type={"search"} is ={'search'} aria-label={"Search venues"}
          placeholder={"search"} onChange={this.handleChange}/>
          <ParkList />
        </div>
      </Menu>
    )
  }
}
