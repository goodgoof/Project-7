import React, {Component} from 'react'
import  locations from '../data/locations.json';


 function ParkList (props) {

    return (
      <ol className="parks">
        {props.locations.map((location, key) =>{
          <li key ={location.name} className="location-list-item" tabindex="0">
            <div className="location-details">
              <p>{location.name}</p>
              <p>{location.url}</p>
            </div>
          </li>
        })}
       </ol>
    )

}

export default ParkList;
