import React from 'react';

export const getTime = () => (new Date()).valueOf();
const msToDayStep = 1000 * 3600 * 24;
const futureTime = 1627794000000;

export const generateDays = (now) => Math.ceil((futureTime - now) / msToDayStep);

export default function Countdown(props) {
  const now = getTime();

  switch (props.type) {

    case 'basic':
      return <>{-1*generateDays(now)}</>;

    case 'fancy':
    default:
      return (
        <div className="countdownComponent">
          <p className="center"><span>{-1*generateDays(now)}</span> days since the Jordan wedding.</p>
          <p className="center">August 1, 2021</p>
        </div>
      );
  }
}
