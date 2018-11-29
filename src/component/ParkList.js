import React from "react";

const ParkList =(props) => {
    return (
      <div className="list-parks">
        <div className="list-parks-top">
          <input
            className="search-parks"
            type="text"
            placeholder="Search Parks"
            value={props.query}
            onChange={event => props.filterQuery(event)}
          />
        </div>

        <div className="showing-locations">
          <span>
            Showing {props.fluidLocations.length} of{" "}
            {props.staticLocations.length}{" "}
          </span>
          <button onClick={props.resetQuery} style={{}} className="showAll">
            {" "}
            Show all{" "}
          </button>
        </div>

        <ol className="parks">
          {props.fluidLocations &&
            props.fluidLocations.map((location, i) => (
              <li
                key={i}
                className="location-list-item"
                tabIndex="0"
                onClick={e => props.handleListitemClick(location)}>
                <div className="location-details">
                  <p>{location.name}</p>
                </div>
                <button className="remove">remove</button>
              </li>
            ))}
        </ol>
      </div>
    );

}

export default ParkList;
