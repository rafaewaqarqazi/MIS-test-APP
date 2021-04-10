import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../assets/styles/scss/_dropdown-menu.scss';
const CustomDropdown = ({
  dropdownToggle,
  dropdownMenu,
  toggleClassName,
  menuClassName,
}) => (
  <Dropdown>
    <Dropdown.Toggle
      className={`menu-toggle carrot-none ${toggleClassName || ''}`}
    >
      {dropdownToggle}
    </Dropdown.Toggle>
    <Dropdown.Menu className={`menu-dropdown ${menuClassName || ''}`}>
      {dropdownMenu}
    </Dropdown.Menu>
  </Dropdown>
);
CustomDropdown.propTypes = {
  dropdownToggle: PropTypes.element.isRequired,
  toggleClassName: PropTypes.string,
  dropdownMenu: PropTypes.element.isRequired,
  menuClassName: PropTypes.string,
};
export default CustomDropdown;
