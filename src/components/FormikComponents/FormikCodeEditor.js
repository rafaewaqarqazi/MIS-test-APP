import React, { useCallback } from 'react';
import { useField } from 'formik';
import Proptypes from 'prop-types';
import CodeEditor from '../CodeEditor/CodeEditor';

const FormikCodeEditor = ({ name }) => {
  const [, { value }, { setValue }] = useField(name);
  const onChange = useCallback(code => {
    setValue(code);
  }, []);
  return <CodeEditor onValueChange={onChange} value={value} />;
};
FormikCodeEditor.propTypes = {
  name: Proptypes.string.isRequired,
};
export default FormikCodeEditor;
