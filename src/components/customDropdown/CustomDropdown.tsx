import React from "react";
import Dropdown from 'react-dropdown';
import "./customDropdown.css"

const CustomDropdown = ({filterOptions, filterValue, onChange}: any) => {

    return (
        <div id="dropdown-container">
        <Dropdown className="dropdown-menu" controlClassName='custom-dropdown-control'  menuClassName='custom-dropdown-menu' onChange={onChange} options={filterOptions} value={filterValue} placeholder="Select an option" />
        </div>
    )
}


export default CustomDropdown;