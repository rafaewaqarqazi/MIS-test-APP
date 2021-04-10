import React from "react";
import PropTypes from "prop-types";
import CustomDropdown from "../dropdown/CustomDropdown";
import DropdownItem from "react-bootstrap/DropdownItem";
import AngleDownIcon from "../svg-icons/AngleDownIcon";
import { useHistory } from "react-router-dom";

const Header = ({ title, subTitle }) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    history.push("/signIn");
  };
  return (
    <header className="header mb-3">
      <div>
        <h5 className="portlet__title">{title}</h5>
        <p className="secondary-text">{subTitle}</p>
      </div>
      <CustomDropdown
        dropdownToggle={
          <div className="account-menu">
            <div className="account-img">
              <img src="/logo192.png" alt="account-img" />
            </div>
            <span>{user?.name || "User"}</span>
            <span className="ml-2">
              <AngleDownIcon size="8px" />
            </span>
          </div>
        }
        dropdownMenu={
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        }
      />
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
export default Header;
