import React, {Component} from 'react'
import  locations from '../data/locations.json';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
// import Button from '@material-ui/core/Button'

 class ParkList extends Component {
   state ={
     query: ""
   }

   //change state based on query entered
   updateQuery =(newQuery) => {
     {this.setState({query: newQuery.trim()})}
   }

   resetQuery = () => {
     this.setState({query: ""})
   }

   listItemClick =location => {
    const marker=this.props.markers.find(marker => marker.id === location.id);
    this.props.handleMarkerClick(marker)
//
  }
   render() {

     const { query } = this.state
     const { locations } = this.props
     //function for search bar
     let showingLocations
     if(query) {
       const match =new RegExp(escapeRegExp(this.state.query), 'i')
       showingLocations = locations.filter((location) => match.test(location.name))

     } else {
       showingLocations =locations
     }
     //sort the park names in alphabetical order
     showingLocations.sort(sortBy('name'))

     return (
       <div className= "list-parks">
         <div className="list-parks-top">
           <input
           className="search-parks"
           type="text"
           placeholder="Search Parks"
           value={this.state.query}
           onChange={(event) => this.updateQuery(event.target.value)}
           />
         </div>

         {showingLocations.length !== locations.length}
         <div className ="showing-locations">
            <span>Showing {showingLocations.length} of {locations.length} </span>
            <button
            onClick={this.resetQuery}
            style={{}}> Show all </button>
         </div>

         <ol className="parks">
             {showingLocations.map((location, key) =>(
               <li
                  key ={location.name}
                  className="location-list-item"
                  tabIndex="0"
                  onClick={() => this.props.listItemClick(this.props)}>
                 <div className="location-details">
                   <p>{location.name}</p>
                 </div>
                 <button className="remove">
                 remove</button>
               </li>
             ))}
          </ol>
      </div>
     )
   }


}

export default ParkList;
