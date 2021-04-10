import React from 'react';

const Portlet = ({ className = '', children }) => (
  <div className={`portlet ${className}`}>{children}</div>
);

export default Portlet;
