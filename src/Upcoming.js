import React from 'react';

export default function Upcoming() {
  return (
    <main>
      <p>Here is what's coming soon to our website!</p>
      <ul>
        <li><span className="listItemHead">RSVP:</span> You'll be able to RSVP for our in-person wedding or our livestream alternative.</li>
        <li><span className="listItemHead">Visiting Houston:</span> We'll provide some recommendations for things to do in the Houston area for those attending in person, especially from far away!</li>
        <li><span className="listItemHead">Registry:</span> You'll be able to view and work with our registry.</li>
        <li><span className="listItemHead">Livestream:</span> On the day of our wedding, you'll be able to watch the ceremony on this website from anywhere!</li>
        <li><span className="listItemHead">Wedding Party:</span> We'll tell the stories of some of our closest friendships.</li>
        <li><span className="listItemHead">Photos:</span> You'll be able to view a collection of our favorite pictures from our relationship so far.</li>
      </ul>
    </main>
  )
}
