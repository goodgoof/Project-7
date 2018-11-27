import React, {Component} from 'react';
import {bubble as Menu} from 'react-burger-menu';
import ParkList from './ParkList.js'
import locations from '../data/locations.json';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default class SideMenu extends Component {
  state ={
    // query: "",
    locations: []
  }

  componentDidMount() {
    console.log(this.props)
  }

  updateQuery =(newQuery) => {
    {this.setState({query: newQuery.trim()})}

  }

  // listItemClick =location => {
  //   console.log(location)
  //      const marker=this.state.markers.find(marker => marker.name === location.name);
  //      this.onMarkerClick(marker)
  //
  // }



  render(){

    return(
      <Menu>
        <div className="sidemenu">
          <ParkList
            listItemHandler={this.props.listItemHandler}
            locations={locations}
            onClick= {this.props.filterQuery}/>
        </div>
        </Menu>

    )
  }
}
