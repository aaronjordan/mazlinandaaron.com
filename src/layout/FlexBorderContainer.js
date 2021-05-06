import React from 'react';

import './FlexBorderContainer.scss';

export default function FlexBorderContainer(props) {
  const rootClass = `flex-border-container ${props.customClassName || ''}`;
  return React.createElement(
    props.as || 'div',
    {
      className: rootClass,
      id: props.id || undefined, 
    },
    <>
      <div className="flex-border fb-left" />
      <span>{props.children}</span>
      <div className="flex-border fb-right" />
    </>
  );
}
