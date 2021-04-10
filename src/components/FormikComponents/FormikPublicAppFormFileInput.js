import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import Proptypes from 'prop-types';
import { useParams } from 'react-router-dom';
import FileInput from '../Forms/FormDesign/FileInput';
import { formErrorMessage } from './FormErrorMessage';
import { getPutURLFormApp } from '../../utils/crud/forms.crud';

const FormikPublicAppFormFileInput = ({ name, ...props }) => {
  const params = useParams();
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(
    value ? value.split(`appformd_${params.formId}_`)[1] : null,
  );
  const onChange = async event => {
    try {
      const appFormId = 486;
      const newFile = event.target.files[0];
      setLoading(true);
      const res = await getPutURLFormApp({
        app_form_id: appFormId,
        company_id: 2,
        fileName: newFile.name,
        fileType: newFile.type,
      });
      // const uploadRes = await uploadS3FormApp(res.url);
      setValue(res.key);
      const fileName = res.key.split(`appformd_${appFormId}_`)[1];
      setFile({ name: fileName });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log({ error: e.message });
    }
  };
  const onRemove = event => {
    event.preventDefault();
    setValue(null);
    setFile(null);
  };
  return (
    <>
      <FileInput
        onChangeImage={onChange}
        onRemoveImage={onRemove}
        value={file}
        loading={loading}
        {...props}
      />
      <ErrorMessage name={name} render={formErrorMessage} />
    </>
  );
};
FormikPublicAppFormFileInput.propTypes = {
  name: Proptypes.string.isRequired,
};
export default FormikPublicAppFormFileInput;
