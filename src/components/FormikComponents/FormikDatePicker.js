import React from 'react';
import { ErrorMessage, useField } from 'formik';
import Proptypes from 'prop-types';
import moment from 'moment';
import { formErrorMessage } from './FormErrorMessage';
import DatePickerComponent from '../../utils/components/ReactDatePicker/DatePickerComponent';
const FormikDatePicker = ({ name }) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChange = date => {
    setValue(moment(date).format('YYYY-DD-MM'));
  };
  return (
    <>
      <DatePickerComponent
        onChange={onChange}
        date={value ? new Date(value) : new Date()}
      />

      <ErrorMessage name={name} render={formErrorMessage} />
    </>
  );
};
FormikDatePicker.propTypes = {
  name: Proptypes.string.isRequired,
};
export default FormikDatePicker;
