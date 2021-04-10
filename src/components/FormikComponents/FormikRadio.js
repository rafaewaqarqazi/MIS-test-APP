import React from 'react';
import { useField } from 'formik';
import Proptypes from 'prop-types';
import StyledRadioButton from '../StyledComponents/StyledRadioButton';

const FormikRadio = ({ name, ...props }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChange = event => {
    setValue(event.target.checked);
  };
  return <StyledRadioButton value={value} onChange={onChange} {...props} />;
};
FormikRadio.propTypes = {
  name: Proptypes.string.isRequired,
};
export default FormikRadio;
