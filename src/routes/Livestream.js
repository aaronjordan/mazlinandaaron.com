import React from 'react';

import './Livestream.scss';

export default function Livestream() {
  return (
    <main className="stream">
      <iframe 
        className="videoContainer"
        src="https://live.mazlinandaaron.com/embed/video"
        title="Mazlin and Aaron Wedding Stream"
        referrerPolicy="origin"
        scrolling="no"
        allowFullScreen>
      </iframe>
      {/* 
      // gotta enable websockets to make this work.
      <iframe
        className="videoContainer"
        src="http://live.mazlinandaaron.com/embed/chat"
        title="Mazlin and Aaron Wedding Stream Chat"
        referrerPolicy="origin"
        scrolling="no">
      </iframe> */}
    </main>
  )
}
