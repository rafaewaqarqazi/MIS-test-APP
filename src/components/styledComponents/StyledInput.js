import styled from "styled-components";
// import Proptypes from 'prop-types';
import ColorList from "../../utils/colorsList";
import { Form } from "react-bootstrap";
const StyledInput = styled(Form.Control)`
  padding: 12px 20px;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid ${ColorList.grey};
  display: flex;
  align-items: center;
  &:focus {
    box-shadow: none;
    outline: none;
  }
  &::placeholder {
    color: ${ColorList.inputPlaceholderColor};
    opacity: 1;
  }
`;

// StyledInput.propTypes = {
//   outlined: Proptypes.bool,
//   secondary: Proptypes.bool,
//   text: Proptypes.bool,
//   loading: Proptypes.bool,
// };
export default StyledInput;
