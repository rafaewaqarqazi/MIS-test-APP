import React from 'react';
import { useField } from 'formik';
import Proptypes from 'prop-types';
import StyledCheckbox from '../StyledComponents/StyledCheckbox';

const FormikCheckBox = ({ name, ...props }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChange = event => {
    setValue(event.target.checked);
  };
  return <StyledCheckbox value={value} onChange={onChange} {...props} />;
};
FormikCheckBox.propTypes = {
  name: Proptypes.string.isRequired,
};
export default FormikCheckBox;
