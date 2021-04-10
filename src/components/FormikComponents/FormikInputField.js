import React from 'react';
import { ErrorMessage, Field } from 'formik';
import Proptypes from 'prop-types';
import { formErrorMessage } from './FormErrorMessage';
import StyledInput from '../styledComponents/StyledInput';

const FormikInputField = ({
  name,
  placeholder,
  type = 'text',
  as = 'input',
  rows = '1',
  ...props
}) => (
  <Field name={name}>
    {({ field, form: { touched, errors } }) => (
      <>
        <StyledInput
          {...field}
          isValid={touched[field.name] && !errors[field.name]}
          isInvalid={touched[field.name] && errors[field.name]}
          placeholder={placeholder}
          type={type}
          as={as}
          rows={rows}
          {...props}
        />
        <ErrorMessage name={field.name} render={formErrorMessage} />
      </>
    )}
  </Field>
);

FormikInputField.propTypes = {
  name: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  type: Proptypes.string,
  as: Proptypes.string,
  rows: Proptypes.string,
};
export default FormikInputField;
