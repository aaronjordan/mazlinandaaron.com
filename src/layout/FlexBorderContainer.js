import React from 'react';

import './FlexBorderContainer.scss';

export default function FlexBorderContainer(props) {
  const rootClass = `flex-border-container ${props.customClassName || ''}`;
  const align = props.align || '';
  return React.createElement(
    props.as || 'div',
    {
      className: rootClass,
      id: props.id,
      onClick: props.onClick,
    },
    <>
      <div className={`flex-border fb-left ${align==='left' ? 'fb-hide' : ''}`} />
      <span>{props.children}</span>
      <div className={`flex-border fb-right ${align==='right' ? 'fb-hide' : ''}`} />
    </>
  );
}
