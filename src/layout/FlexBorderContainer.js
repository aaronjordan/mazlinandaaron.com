import React from 'react';

import './FlexBorderContainer.scss';

export default function FlexBorderContainer(props) {
  const rootClass = `flex-border-container ${props.customClassName || ''}`;
  const align = props.align || '';
  return React.createElement(
    props.as || 'div',
    {
      className: rootClass,
      id: props.id || undefined, 
    },
    <>
      {align !== 'left' && <div className="flex-border fb-left" />}
      <span>{props.children}</span>
      {align !== 'right' && <div className="flex-border fb-right" />}
    </>
  );
}
