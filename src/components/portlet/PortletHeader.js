import React from 'react';

const PortletHeader = ({
  title = '',
  toolbar,
  headerClassName = '',
  titleClassName = '',
  subTitle,
}) => (
  <div className={`portlet__header ${headerClassName}`}>
    <div className="flex-grow-1">
      <div className={`portlet__title ${titleClassName}`}>{title}</div>
      {subTitle && <div className="text secondary-text">{subTitle}</div>}
    </div>

    {toolbar || null}
  </div>
);

export default PortletHeader;
