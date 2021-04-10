import styled from 'styled-components';
import Proptypes from 'prop-types';
import React from 'react';
import ColorList from '../../utils/colorsList';
const ButtonStyled = styled.button`
  padding: 6px 18px;
  font-weight: 600;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: center;

  background-color: ${(props) =>
    props.secondary ? ColorList.separator : ColorList.primary};
  border-color: ${(props) =>
    props.secondary ? ColorList.separator : ColorList.primary};
  color: ${(props) =>
    props.secondary ? ColorList.textDark : ColorList.white} !important;
  ${(props) => {
    if (props.outlined) {
      const color = props.secondary ? ColorList.separator : ColorList.primary;

      return `color: ${color} !important;
      background-color: ${ColorList.white};
  border: 1px solid ${color};`;
    }
    return '';
  }};
  ${(props) => {
    if (props.text) {
      const color = props.secondary ? ColorList.textDark : ColorList.primary;

      return `color: ${color} !important;
      background-color: ${ColorList.white};
      border: 1px solid ${ColorList.white};
      `;
    }
    return '';
  }};
  ${(props) =>
    props.danger
      ? `color: ${ColorList.white} !important;
      background-color: ${ColorList.red};
      border: 1px solid ${ColorList.red};
      `
      : ''}};
`;

const StyledButton = ({ loading, children, ...props }) => (
  <ButtonStyled {...props}>
    <span
      className={`spinner spinner-border spinner-border-sm ${
        !loading ? 'd-none' : 'd-inline-block'
      }`}
      style={{
        transition: 'all 0.3s linear',
      }}
    />
    <span
      style={{
        marginLeft: !loading ? 0 : 10,
        transition: 'margin-left 0.3s ease-in',
      }}
    >
      {children}
    </span>
  </ButtonStyled>
);

// ButtonStyled.defaultProps = {
//   theme: {
//     primary: ColorList.red,
//   },
// };
StyledButton.propTypes = {
  outlined: Proptypes.bool,
  secondary: Proptypes.bool,
  text: Proptypes.bool,
  loading: Proptypes.bool,
  children: Proptypes.any,
};
export default StyledButton;
