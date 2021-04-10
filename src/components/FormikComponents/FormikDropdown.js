import React from 'react';
import { ErrorMessage, useField } from 'formik';
import Proptypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import AngleDownIcon from '../svgIcons/AngleDownIcon';
import { formErrorMessage } from './FormErrorMessage';

const FormikDropdown = ({ name, options, toggleClassName = 'dropdown-bg' }) => {
  const [, { value }, { setValue }] = useField(name);
  const onClick = newValue => () => {
    setValue(newValue);
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className={toggleClassName}>
          <div className="d-flex align-items-center center  w-100">
            <span className="flex-grow-1 text-left text-capitalize">
              {value || 'Select'}
            </span>
            <AngleDownIcon size="11px" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="menu-dropdown shadow-lg w-100">
          {options.map(option => (
            <Dropdown.Item
              onClick={onClick(option.value || option.label)}
              key={option.value || option.label}
            >
              {option.title || option.label}
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
