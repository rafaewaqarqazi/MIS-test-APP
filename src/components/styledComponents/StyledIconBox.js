import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
const StyledIconBox = styled(({ children, as: Component, ...props }) => <Component {...props}>{children}</Component>
)`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  border-radius: 10px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.color};
  svg {
    fill: currentColor;
  }
  text-decoration: none;
  &:hover{
    text-decoration: none;
    color: ${(props) => props.textColor};
  }
`;
StyledIconBox.defaultProps = {
  marginRight: '5px',
  marginBottom: '0',
  size: '40px',
  textColor: '#fff',
  as:'div'
};
StyledIconBox.propTypes = {
  size: Proptypes.string,
  marginRight: Proptypes.string,
  marginBottom: Proptypes.string,
  color: Proptypes.string,
  textColor: Proptypes.string,
};
export default StyledIconBox;
