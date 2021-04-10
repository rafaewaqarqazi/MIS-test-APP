import React from 'react';

const PortletBody = ({ withBg, className = '', children }) => (
  <div className={`${className} portlet__body${withBg ? '-bg' : ''}`}>
    {children}
  </div>
);

export default PortletBody;
