import React from 'react';
import Proptypes from 'prop-types';

const AngleDownIcon = ({ size = '18px', left, right, up }) => {
  let style = {
    transition: 'all 0.3s linear',
  };
  if (left) {
    style = {
      ...style,
      transform: 'rotate(90deg)',
    };
  }
  if (right) {
    style = {
      ...style,
      transform: 'rotate(-90deg)',
    };
  }
  if (up) {
    style = {
      ...style,
      transform: 'rotate(180deg)',
    };
  }
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 612 612"
      xmlSpace="preserve"
      style={style}
    >
      <g>
        <g id="_x31_0_34_">
          <g>
            <path
              d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782
				c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296
				c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"
            />
          </g>
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
};

AngleDownIcon.propTypes = {
  size: Proptypes.string,
  left: Proptypes.bool,
  right: Proptypes.bool,
  up: Proptypes.bool,
};
export default AngleDownIcon;
