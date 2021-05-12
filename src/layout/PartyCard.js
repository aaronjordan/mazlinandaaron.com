import React from 'react';
import AdaptiveImg from '../AdaptiveImg';
import FlexBorderContainer from './FlexBorderContainer';

export default function PartyCard(props) {
  const {
    name="Firstname Lastname",
    imgLabel="https://via.placeholder.com/250/467c46/ffffff?text=%20",
    align="left",
  } = props;

  const imgElement = props.imgLabel ? 
    (<AdaptiveImg label={imgLabel} className="party-img" alt={`${name} portrait`} />) : 
    (<img src={imgLabel} className="party-img" alt={`${name} portrait`} />);

  return (
    <article className={`wedding-party-card ${align}`}>
      {imgElement}
      <div className="text-content">
        <FlexBorderContainer align={align}>{name}</FlexBorderContainer>
        <span>{props.children}</span>
      </div>
    </article>
  )
}
