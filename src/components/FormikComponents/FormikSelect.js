import React from 'react';
import { ErrorMessage, useField } from 'formik';
import Proptypes from 'prop-types';
import Select from 'react-select';
import { formErrorMessage } from './FormErrorMessage';
const FormikSelect = ({ name, options, isMulti, ...props }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChange = values => {
    if (Array.isArray(values)) {
      setValue(values.map(v => v.value));
    } else {
      setValue(values?.value);
    }
  };
  let newValue = null;
  if (Array.isArray(value)) {
    newValue = value.map(v => ({ value: v, label: v }));
  } else if (value) {
    newValue = { value, label: value };
  }
  return (
    <>
      <Select
        isMulti={isMulti}
        options={options.map(option => ({
          value: option.label,
          label: option.label,
        }))}
        value={newValue}
        onChange={onChange}
        className="multi-select"
        {...props}
      />
      <ErrorMessage name={name} render={formErrorMessage} />
    </>
  );
};
FormikSelect.propTypes = {
  name: Proptypes.string.isRequired,
  options: Proptypes.array.isRequired,
  isMulti: Proptypes.bool,
};

export default FormikSelect;
