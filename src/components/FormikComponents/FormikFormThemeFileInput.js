import React, { useEffect, useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import FileInput from '../Forms/FormDesign/FileInput';
import { formErrorMessage } from './FormErrorMessage';
import { getMedia, uploadMedia } from '../../utils/crud/forms.crud';
import { makeSelectGetDesignTheme } from '../../containers/Forms/FormDesign/selectors';
import { toJS } from '../../utils/toJs';
import { actions } from '../../containers/Forms/FormDesign/actions';

const FormikFormThemeFileInput = ({
  name,
  designTheme,
  saveFormThemeAction,
  ...props
}) => {
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      if (typeof value === 'number') {
        getMedia(value)
          .then(res => {
            setValue(res.data);
          })
          .catch(error => {
            console.log({ error: error.message });
            setValue(value);
          });
      }
    },
    [value],
  );

  const onRemove = event => {
    event.preventDefault();
    setValue(null);
  };
  const handleChangeImage = event => {
    enableLoading();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('media', file);
    uploadMedia(formData)
      .then(res => {
        setValue(res?.data[0]);
        disableLoading();
      })
      .catch(error => {
        console.log({ error: error.message });
        disableLoading();
      });
  };
  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };
  return (
    <>
      <FileInput
        onChangeImage={handleChangeImage}
        onRemoveImage={onRemove}
        value={value && value?.title && { name: value?.title }}
        loading={loading}
        {...props}
      />
      <ErrorMessage name={name} render={formErrorMessage} />
    </>
  );
};
FormikFormThemeFileInput.propTypes = {
  name: PropTypes.string.isRequired,
  designTheme: PropTypes.object,
  saveFormThemeAction: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  designTheme: makeSelectGetDesignTheme(),
});
const mapDispatchToProps = {
  saveFormThemeAction: actions.saveFormThemeAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(FormikFormThemeFileInput));
