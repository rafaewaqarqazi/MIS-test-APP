import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import ColorList from '../../utils/colorsList';
const StyledText = styled(({ children, as: Component, ...props }) => (
  <Component {...props}>{children}</Component>
))`
  svg {
    fill: currentColor;
  }

  color: ${(props) => props.color};
`;
StyledText.defaultProps = {
  color: ColorList.textDark,
  as: 'div',
};
StyledText.propTypes = {
  color: Proptypes.string,
  as: Proptypes.string,
};
export default StyledText;
