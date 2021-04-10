import React from 'react';
import { useField } from 'formik';
import Proptypes from 'prop-types';
import StyledSwitch from '../StyledComponents/StyledSwitch';

const FormikSwitch = ({ name }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChange = event => {
    setValue(event.target.checked);
  };
  return <StyledSwitch value={value} onChange={onChange} />;
};
FormikSwitch.propTypes = {
  name: Proptypes.string,
};
export default FormikSwitch;
