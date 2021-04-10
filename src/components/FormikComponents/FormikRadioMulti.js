import React from 'react';
import { useField } from 'formik';
import Proptypes from 'prop-types';
import StyledRadioButton from '../StyledComponents/StyledRadioButton';

const FormikRadioMulti = ({ name, options }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const onChange = newValue => () => {
    setValue(newValue);
  };
  return (
    <div className="d-flex align-items-center">
      {options?.map(option => (
        <StyledRadioButton
          label={option.label}
          value={value === option.label}
          onChange={onChange(option.label)}
          key={option.id || option.label}
          name={name}
        />
      ))}
    </div>
  );
};
FormikRadioMulti.propTypes = {
  name: Proptypes.string.isRequired,
  options: Proptypes.array.isRequired,
};

export default FormikRadioMulti;
