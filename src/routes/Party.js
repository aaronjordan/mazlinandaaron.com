import React from 'react';
import FlexBorderContainer from '../layout/FlexBorderContainer';
import PartyCard from '../layout/PartyCard';

import './Party.scss';

export default function Party() {
  return (
    <div>
      look how cute our wedding party is
      <FlexBorderContainer><h4>Wedding Party</h4></FlexBorderContainer>
      <PartyCard 
        name="Hope King" 
        imgLabel="hope"
      >
        What a woman to share so much life with! From growing up together in our church’s youth group to standing up with each other in both of our weddings. Hope knows how to bring out the best in circumstances and always points me back to Christ when I fail to see how he’s working. I love her passion for lifting women up! Not only is she a fiercely loyal friend, she is a fantastic wedding planner and coordinator and I’m so grateful for her! 
      </PartyCard>
      <PartyCard 
        name="Bennett Meares" 
        align="right"
      >
        Bacon ipsum dolor amet pig porchetta boudin tongue ball tip. Beef ribs biltong sausage picanha, drumstick salami tenderloin. Pork loin rump ball tip, meatloaf meatball capicola boudin sirloin pork chop picanha. Strip steak corned beef beef ribs, pork chop burgdoggen fatback shank buffalo ground round pork kielbasa short loin tail landjaeger. Shank picanha shankle ball tip ham ribeye sausage, kielbasa brisket corned beef tri-tip turkey strip steak pork chop chicken.      </PartyCard>
      <PartyCard 
        name="Ashton Priddy" 
        imgLabel="ashton"
      >
        Strong & beautiful! These are the two best words to describe my friend Ashton! I’m so grateful for the two years we were “the Egan girls” in “the Egan house”. We must have watched About Time and Pride and Prejudice twice a month at least! I’m so incredibly grateful for our friendship even after your move to Colorado. I miss you but can’t wait to celebrate in August! 
      </PartyCard>
      <PartyCard 
        name="Ben Hewes" 
        align="right"
      >
        Bacon ipsum dolor amet pig porchetta boudin tongue ball tip. Beef ribs biltong sausage picanha, drumstick salami tenderloin. Pork loin rump ball tip, meatloaf meatball capicola boudin sirloin pork chop picanha. Strip steak corned beef beef ribs, pork chop burgdoggen fatback shank buffalo ground round pork kielbasa short loin tail landjaeger. Shank picanha shankle ball tip ham ribeye sausage, kielbasa brisket corned beef tri-tip turkey strip steak pork chop chicken.      </PartyCard>
      <PartyCard 
        name="Kylie Grigar" 
        imgLabel="kylie"
      >
        Bacon ipsum dolor amet pig porchetta boudin tongue ball tip. Beef ribs biltong sausage picanha, drumstick salami tenderloin. Pork loin rump ball tip, meatloaf meatball capicola boudin sirloin pork chop picanha. Strip steak corned beef beef ribs, pork chop burgdoggen fatback shank buffalo ground round pork kielbasa short loin tail landjaeger. Shank picanha shankle ball tip ham ribeye sausage, kielbasa brisket corned beef tri-tip turkey strip steak pork chop chicken.      </PartyCard>
      <PartyCard 
        name="David Gleaton" 
        align="right"
      >
        Bacon ipsum dolor amet pig porchetta boudin tongue ball tip. Beef ribs biltong sausage picanha, drumstick salami tenderloin. Pork loin rump ball tip, meatloaf meatball capicola boudin sirloin pork chop picanha. Strip steak corned beef beef ribs, pork chop burgdoggen fatback shank buffalo ground round pork kielbasa short loin tail landjaeger. Shank picanha shankle ball tip ham ribeye sausage, kielbasa brisket corned beef tri-tip turkey strip steak pork chop chicken.      </PartyCard>
    </div>
  )
}
