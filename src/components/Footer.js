import React from 'react';

const Footer = () => (
  <div className="portlet__body d-flex align-items-center justify-content-center footer border-bottom-right-radius">
    <h6 className="text-grey mb-0">
      Copyright © {new Date().getFullYear()}. All rights reserved.
    </h6>
  </div>
);

export default Footer;
