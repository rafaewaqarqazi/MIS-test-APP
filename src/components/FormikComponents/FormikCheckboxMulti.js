import React from 'react';
import { useField } from 'formik';
import Proptypes from 'prop-types';
import StyledCheckbox from '../StyledComponents/StyledCheckbox';

const FormikCheckboxMulti = ({ name, options }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const onChange = newValue => () => {
    if (Array.isArray(value)) {
      const val = value.includes(newValue)
        ? value.filter(v => v !== newValue)
        : [...value, newValue];
      setValue(val);
    } else {
      setValue([newValue]);
    }
  };
  return (
    <div className="d-flex align-items-center">
      {options?.map(option => (
        <StyledCheckbox
          label={option.label}
          value={value?.includes(option.label)}
          onChange={onChange(option.label)}
          key={option.id || option.label}
        />
      ))}
    </div>
  );
};
FormikCheckboxMulti.propTypes = {
  name: Proptypes.string.isRequired,
  options: Proptypes.array.isRequired,
};

export default FormikCheckboxMulti;
