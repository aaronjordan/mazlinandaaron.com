import React from 'react';

const getTime = () => (new Date()).valueOf();
const msToDayStep = 1000 * 3600 * 24;

export default function Countdown(props) {
  const now = getTime();
  const futureTime = 1627794000000;

  const generateDays = () => Math.ceil((futureTime - now) / msToDayStep);

  switch (props.type) {

    case 'basic':
      return <>{generateDays()}</>;

    case 'fancy':
    default:
      return (
        <div className="countdownComponent">
          <p className="center"><span>{generateDays()}</span> days until the Jordan wedding.</p>
          <p className="center">August 1, 2021</p>
        </div>
      );
  }
}
