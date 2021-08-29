import React from 'react';
import {Table} from 'react-bootstrap';
import Countdown from '../layout/Countdown';
import FlexBorderContainer from '../layout/FlexBorderContainer';
import AdaptiveImg from '../AdaptiveImg';

import './Home.scss';

export const Home = () => {
  // const isWeddingDay = generateDays(getTime()) <= 6;
  const showStories = true;

  return (
    <main className="home">
      <div className="img-filter" />
      <AdaptiveImg label="eng1" alt="Mazlin and Aaron" className="hero" />
      <Countdown type="fancy"/>
      <section className="schedule">
        <FlexBorderContainer as="h2">Our Schedule</FlexBorderContainer>
        <h4 style={{display: 'inline'}}>August 1, 2021</h4>
        <span style={{float: 'right'}}>Houston, Texas</span>
        <Table>
          <tbody>
            <tr>
              <th>5:30pm</th>
              <td>Doors Open</td>
            </tr>
            <tr>
              <th>5:50pm</th>
              <td>Livestream Begins</td>
            </tr>
            <tr>
              <th>6:00pm</th>
              <td>
                <span>Ceremony Starts</span>
                <section className="ceremony-detail">
                  <h4>Seating of the Family</h4>
                  <p><em>Moon</em> by Sleeping at Last</p>
                  <ol>
                    <li>Mother of the Groom, Ms. Darlene Jordan <span className="subtle">Ushered by Aaron Jordan</span></li>
                    <li>Father of the Groom, Mr. Earl Jordan</li>
                    <li>Grandmother of the Bride, Mrs. Gloria Massey<span className="subtle">Ushered by Thomas Reed Massey</span></li>
                    <li>Mother of the Bride, Mrs. DeAnn Massey<span className="subtle">Ushered by Thomas Reed Massey</span></li>
                  </ol>
                  <h4>Wedding Party Processional</h4>
                  <ol>
                    <li>Officiant, Mr. Tom Blaylock</li>
                    <li>Groomsman, David Gleaton</li>
                    <li>Groomsman, Ben Hewes</li>
                    <li>Best Man, Bennett Meares</li>
                    <li>Bridesmaid, Kylie Grigar</li>
                    <li>Bridesmaid, Ashton Maddox</li>
                    <li>Bridesmaid, Hope King</li>
                    <li>Man of Honor, Thomas Reed Massey</li>
                  </ol>
                  <h4>Bridal Processional</h4>
                  <p><em>Sun</em> by Sleeping at Last</p>
                  <ol>
                    <li>Father of the Bride, Mr. Tom Massey</li>
                    <li>Mazlin Massey</li>
                  </ol>
                  <h4>Greeting and Scripture Reading</h4>
                  <p>1 Corinthians 13</p>
                  <h4>Vows</h4>
                  <h4>The Exchange of Rings</h4>
                  <h4>Presentation of Mazlin and Aaron Jordan</h4>
                </section>
              </td>
            </tr>
            <tr>
              <th>7:00pm</th>
              <td>Reception</td>
            </tr>
          </tbody>
        </Table>
      </section>
      <section className="body-content" data-expanded={showStories} /*onClick={() => setShowStories(x => !x)}*/>
        <p className="center">Thank you to Hinge and Taylor Swift for making all of this happen.</p>
        <FlexBorderContainer><h4>Mazlin’s story</h4></FlexBorderContainer>
        <div className="text-content maz">
          <p>It’s crazy to think back to how we first met because it was on a dating app in the middle of the pandemic. I had been living in Austin only for a few months and had made some amazing connections at a local church. To be completely honest, I hated dating apps and only joined because my friends said I should.</p>
          <p>Much to my surprise, I found this cute boy on Hinge who loves Jesus, Taylor Swift, and Texas (and yes, all in that order) who had just moved to Austin from South Carolina. We went on one date and both knew we found something special.</p>
          <p>Our first date started a week before the actual date night… We met for breakfast at 24 Diner and I was given a bright orange note card that read on one side “A REAL DATE” and on the other had a list of hints for what we were doing on our first date. The clues were:
          </p>
            <ol>
              <li>Get me back to Nashville, Tennessee</li>
              <li>A friendly game</li>
              <span className="subtle">(and my favorite)</span>
              <li>Why is this cooler here?</li>
            </ol>
          <p>I spent all week trying to figure out what he could mean with all of these clues but literally came up with nothing! I knew Aaron had lived in Nash for a summer before moving to Austin but I had no idea where we were starting this date if we were staying in Texas. Starting with hint #1, we start the night at Tumble 22, a spot for Nashville hot chicken. He did not hesitate to let me lead the conversation, but I swear at one point I actually said “you know we don’t have to talk about Taylor Swift the whole time.” We then made our way to a bowling alley for “a friendly game” where he hustled me by pretending he wasn’t any good. In the end it was all fair, lol. He won the first round and I won the second!</p>
          <p>On our way out of the bowling alley he casually leans over and says “well aren’t you gonna ask about the cooler?” To which he proceeds to open the backseat of his car revealing a small drink cooler… a small empty drink cooler. For all intents and purposes of going along with his bit I ask “what is this cooler doing here?” Next thing I know, we are ordering milkshakes from Amy’s ice cream, storing them in the cooler, and making our way to the last location for the date: Zilker Park.</p>
          <p>What a night! I think everyone can see who the more romantic one is between the two of us!</p>
          <p className="ellipsis">• • •</p>
        </div>
        <FlexBorderContainer><h4>Aaron's story</h4></FlexBorderContainer>
        <div className="text-content aaron">
          <p>On that night — our first date, I was certain I was getting to know someone extraordinary. I had never been so comfortable on a date. A couple days afterward, just days into our relationship, I went to Barnes and Noble and picked up a new journal. At that moment, I definitively knew that if the real Mazlin was remotely close in character to the person I believed she was based on our limited interactions, I would want to keep this relationship, maintaining and building upon it for a long time. I began writing in the journal that night, giving a rundown of what my first impressions were when we met at Mozart’s Coffee. Over the course of about 50 letters written over five months, each one giving some new perspective of my world as it changed, I fell deeply and passionately in love with Mazlin Massey. </p>
          <p>As I look at it, those letters were really where the proposal story began. I knew after just a couple weeks of writing that I wanted to give that journal to Mazlin before we were engaged. Within its pages and frozen in time are so many moments, ranging from our first “I love you” to stories from my past to a lengthy and heartwarming conclusion that I was barely able to write without crying. When I gave her the journal, she removed it from its box and said something to the effect of, “Oh wow, it’s just like your journal!”, which I found quite funny at the time. Upon opening it, noticing I had written on one of the first pages, then flipping quickly through and seeing I had written on very many of the pages, she realized what was actually happening. Mazlin was a delighted mess for some time afterward.  While I adore her engagement ring, the handoff of the journal about a month before was (for me at least) the most meaningful gift.</p>
          <p>The next <i>phase</i> of the proposal involved a ring. I was delighted that Mazlin was not the type to want to choose or give strong hints about her ring. I had a fun time shopping around with minimal parameters (”gold ring, clear center stone”) and ended up finding an engagement ring that I think is an incredible and well balanced piece.</p>
          <p>I also needed a place and time for the proposal, and this is where things became complicated. My initial plan fell through because I couldn’t get the space I was looking for on the day I needed it. By the time this was confirmed with me, my backup plan (which was to be scheduled sooner) was only two weeks away. I set out to make it work.</p>
          <p>Plan B here was to propose on Friday, May 23. The scene would recreate part of our first date, all the way down to asking her to marry me in the same spot of the same park where I initially asked her out. I had a clear idea of how this could work, but from the start I was missing some important information. Really, it felt like everything that could go wrong for that plan did. I was able to work around some critical people being unavailable, I pushed back everything by an hour when I found out Mazlin had some plans midday, and I even had to revise the proposal location because Zilker was so incredibly crowded in the great weather that week. What I couldn’t resolve, and what ultimately shot down plan B, was the forecast for thunderstorms all day, which wrecked my goal for a downtown-view proposal. The date-shift to Saturday, May 24 was inevitable at that point, but it did remove most of the element of surprise.</p>
          <p>Perhaps the most bold part of my Friday proposal plan was convincing Mazlin that the proposal would be on Saturday. I gave her a date card similar to the one she got for her first date, which ultimately was meant to do exactly that. All the events on the card would take place (I thought) on the 23rd. I specifically told Mazlin that the date/time on the card (April 24, 5pm) was when she could talk about the card with people other than me. She would — and did — falsely assume that this proposal outlined what would happen on the 24th. This, I felt, was the sweetest con: I’d propose one day “early” to make it a grand surprise. It just felt in the end like that plan, for whatever reason, was not meant to be.</p>
          <p>In reality, we had a beautiful date on the 24th. Over dinner at the place we went on our first date, I told Mazlin the story of how so many pieces fell through. We had some great hot chicken. Afterward, we went downtown to Butler Park, an alternative to Zilker that I had become quite fond of. To my delight, as we walked up the hill in the park, there were a handful of photographers. I, of course, had asked one to be there, but Mazlin was watching with great suspicion every person with a camera.</p>
          <p>Near the top of that hill, we stopped on the path. I told Mazlin very honestly that I could drag out my speech with a million things, but I’d already written and given her the words. Any attempt I made to articulate how I felt in that moment, I believed, wouldn’t compare to the pages and pages of writing in which I resolved to make it to that moment and many after. I told her that I loved her and — to fulfill the line item on the date card — that I would always be overdramatic and true to her. I asked her if she would marry me, to which she said “Yes, of course”, then out of sheer excitement, she gave me a good shove away in the left arm. (She tends to punch when overwhelmed with happy emotions. It’s cute.) Shortly afterward, we went to her aunt’s house and celebrated with many of our friends and her family. It was almost surreal having just about everyone I know from Texas in one place.</p>
          <p>That day was perfect, and given the choice of any idea I ever had about this proposal, I would take this rained-out-rescheduled-fallback plan over any of the others. Everything ran smoothly, I had great help to make it happen, Mazlin loved her ring, we had excellent weather for photos, and I got the chance to promise to marry this delightful person who, out of thin air, has made my life so much more vivid, colorful, and gratifying.</p>
          <p>Today, I've thoroughly enjoyed the <Countdown type="basic" /> days, and am certain beyond any doubt that Mazlin Massey is the someone that I’ve been hoping for for a long time.</p>
          <p className="ellipsis">• • •</p>
        </div>
      </section>
      <h1 className="signature">M + A</h1>
    </main>
  );
};

export default Home;