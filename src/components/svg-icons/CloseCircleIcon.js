import React from 'react';
import Proptypes from 'prop-types';

const CloseCircleIcon = ({ size = '20px' }) => (
  <svg
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m12 24c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-23c-6.065 0-11 4.935-11 11s4.935 11 11 11 11-4.935 11-11-4.935-11-11-11z" />
    </g>
    <g>
      <path d="m8.111 16.389c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l7.778-7.778c.195-.195.512-.195.707 0s.195.512 0 .707l-7.778 7.778c-.097.097-.225.146-.353.146z" />
    </g>
    <g>
      <path d="m15.889 16.389c-.128 0-.256-.049-.354-.146l-7.778-7.779c-.195-.195-.195-.512 0-.707s.512-.195.707 0l7.778 7.778c.195.195.195.512 0 .707-.097.098-.225.147-.353.147z" />
    </g>
  </svg>
);
CloseCircleIcon.propTypes = {
  size: Proptypes.string,
};
export default CloseCircleIcon;
