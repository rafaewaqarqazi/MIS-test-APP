import React from "react";
import { ErrorMessage, useField } from "formik";
import Proptypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { formErrorMessage } from "./FormErrorMessage";
import AngleDownIcon from "../svg-icons/AngleDownIcon";

const FormikDropdown = ({
  name,
  options,
  toggleClassName = "menu-toggle carrot-none w-100",
}) => {
  const [, { value }, { setValue }] = useField(name);
  const onClick = (newValue) => () => {
    setValue(newValue);
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className={toggleClassName}>
          <div className="d-flex align-items-center center  w-100">
            <span className="flex-grow-1 text-left text-capitalize">
              {value
                ? options.filter((opt) => opt.value === value)[0].title
                : "Select Vital"}
            </span>
            <AngleDownIcon size="11px" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="menu-dropdown">
          {options.map((option) => (
            <Dropdown.Item onClick={onClick(option.value)} key={option.value}>
              {option.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <ErrorMessage name={name} render={formErrorMessage} />
    </>
  );
};
FormikDropdown.propTypes = {
  name: Proptypes.string.isRequired,
  options: Proptypes.array.isRequired,
  toggleClassName: Proptypes.string,
};
export default FormikDropdown;
