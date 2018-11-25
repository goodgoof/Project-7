import React, {Component} from 'react'
import  locations from '../data/locations.json';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
// import Button from '@material-ui/core/Button'




 class ParkList extends Component {
   state ={
     query: ""
   }

   updateQuery =(newQuery) => {
     {this.setState({query: newQuery.trim()})}

   }
   render() {
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
         <ol className="parks">
             {this.props.locations.map((location, key) =>(
               <li
                  key ={location.name}
                  className="location-list-item"
                  tabIndex="0">
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
