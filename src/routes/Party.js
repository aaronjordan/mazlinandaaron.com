import React from 'react';
import FlexBorderContainer from '../layout/FlexBorderContainer';
import PartyCard from '../layout/PartyCard';

import './Party.scss';

export default function Party() {
  return (
    <main>
      <p className="lead-in center">We'd love the chance to introduce you to our wedding party! Have a look below.</p>
      <FlexBorderContainer customClassName="added-space"><h3>Wedding Party</h3></FlexBorderContainer>
      <PartyCard 
        name="Hope King" 
        imgLabel="hope"
      >
        What a woman to share so much life with! From growing up together in our church’s youth group to standing up with each other in both of our weddings. Hope knows how to bring out the best in circumstances and always points me back to Christ when I fail to see how he’s working. I love her passion for lifting women up! Not only is she a fiercely loyal friend, she is a fantastic wedding planner and coordinator and I’m so grateful for her!
      </PartyCard>
      <PartyCard 
        name="Bennett Meares" 
        imgLabel="bennett"
        align="right"
      >
        Bennett is a source of inspiration for me. He’s the type of person to have a goal in mind and relentlessly chase after it, seen through things like founding Film Club (twice), consistently impressing me with software he’s written, and building a unique path for himself through obstacles that would’ve been barriers for anyone less driven. He has my respect and is likely my closest friend these days.
      </PartyCard>
      <PartyCard 
        name="Ashton Maddox" 
        imgLabel="ashton"
      >
        Strong & beautiful! These are the two best words to describe my friend Ashton! I’m so grateful for the two years we were “the Egan girls” in “the Egan house”. We must have watched About Time and Pride and Prejudice twice a month at least! I love that we get to share spaces in each other’s weddings and I’m so incredibly grateful for our friendship even after your move to Colorado.
      </PartyCard>
      <PartyCard 
        name="Ben Hewes"
        imgLabel="ben" 
        align="right"
      >
        My friendship with Ben is one of my most long-standing. He has a great sense of humor and an air of professionalism about him. I especially appreciated his presence and input at times when my life picked up momentum. Times I went through family drama, got dumped, or anything similar, he was there. Ben helped me see on several occasions that time moves on — no state is final. He’s someone who I trust that I’m always glad to hear from.
      </PartyCard>
      <PartyCard 
        name="Kylie Grigar" 
        imgLabel="kylie"
      >
        This girl knows how to love others well. Kylie’s passion for her work and love for her students always challenges me to love others more. Kylie, I have loved getting to grow up with you from what must have been fifth grade until now. Hundreds of sleepovers, midnight movie premieres, and dance competitions later, I am so grateful to call you my friend!      
      </PartyCard>
      <PartyCard 
        name="David Gleaton" 
        imgLabel="gleaton"
        align="right"
      >
        I still remember the moment I met David, back in eighth grade. I think I made a reference to a YouTube channel, to which he replied something like, “Wait, do you watch the Yogscast?”. At that moment, the connection was made — we realized we were both quite geeky about similar things. Ever since, David has been a loyal friend I enjoy catching up with and regularly get decent recommendations from.
      </PartyCard>
    </main>
  )
}
