import React from "react";
import { bubble as Menu } from "react-burger-menu";
import ParkList from "./ParkList.js";

const SideMenu = ({
  handleListitemClick,
  fluidLocations,
  staticLocations,
  filterQuery
}) => {
  return (
    <Menu burgerButtonClassName={"burger-bars"}>
      <div className="sidemenu">
        <ParkList
          handleListitemClick={handleListitemClick}
          fluidLocations={fluidLocations}
          staticLocations={staticLocations}
          filterQuery={filterQuery}
        />
      </div>
    </Menu>
  );
};

export default SideMenu;
