import React from 'react';
import { Tooltip, OverlayTrigger, Table } from 'react-bootstrap';

import AdaptiveImg from '../AdaptiveImg';
import FlexBorderContainer from '../layout/FlexBorderContainer';

import './Visiting.scss';

const myrTip = props => (
  <Tooltip {...props}>
    Myrtle Beach International Airport
  </Tooltip>
);

const chsTip = props => (
  <Tooltip {...props}>
    Charleston International Airport
  </Tooltip>
);

const gspTip = props => (
  <Tooltip {...props}>
    Greenville-Sparanburg International Airport
  </Tooltip>
);

const houTip = props => (
  <Tooltip {...props}>
    William P. Hobby Airport
  </Tooltip>
);

const iahTip = props => (
  <Tooltip {...props}>
    George Bush Intercontinental Airport
  </Tooltip>
);

const ItemCard = props => (
  <article className="todo-item">
    <AdaptiveImg label={props.imgLabel || ''} />
    <span>{props.title || ''}</span>
  </article>
);

export default function Visiting() {
  return (
    <main id="visitHtx">
      Who is ready to get down in H-town?! We love all things Texas and would love to share some of the best with you! Here's a list of our best recommended hotels, restaurants, and things to do in Houston →
      <article id="hotels">
        <FlexBorderContainer as="h2">Hotels</FlexBorderContainer>
        <section id="bestWestern">
          <div className="imgContainer275">
            <AdaptiveImg 
              label="bw"
              alt="best western hotel, downtown houston"/>
          </div>
          <p>
            <span>We have a block of rooms available at the Best Western Plus in downtown Houston. The hotel is a five minute drive away from our wedding venue. You can follow the link below or call the hotel (<a id="hotelPhone" href="tel:7135717733">713-571-7733</a>) to book at our group rate.</span>
            <a href="https://www.bestwestern.com/en_US/book/hotel-rooms.44498.html?groupId=4R5VD3W5">Click here to check out the hotel!</a>
          </p>
        </section>
        <section id="otherHotels">
          <div className="imgContainer275">
            <AdaptiveImg 
              label="search"
              alt="screenshot from search for other hotels in houston"
              modal
              />
          </div>
          <p>
            There are many great hotel options in and around Houston! We chose to block rooms at the Best Western Plus because we feel that both its positioning in downtown Houston and its proximity to our wedding space make it a great fit for most of our guests. Of course, you do not have to book a room there to attend our wedding and are welcome to do your own research on the area to choose a hotel that best suits your needs.
          </p>
        </section>
      </article>
      <article id="thingsToDo">
        <FlexBorderContainer as="h2">Things to Do</FlexBorderContainer>
        <section className="floatCards">
          <ItemCard 
            imgLabel="nasa"
            title="NASA Space Center, Houston"
            />
          <ItemCard 
            imgLabel="hermannpark"
            title="Hermann Park"
            />
          <ItemCard 
            imgLabel="ricevillage"
            title="Rice Village (Shopping)"
            />
          <ItemCard 
            imgLabel="galveston"
            title="Galveston Beach"
            />
          <ItemCard 
            imgLabel="baybrookmall"
            title="Baybrook Mall (Shopping)"
            />
        </section>
      </article>
      <article id="food">
        <FlexBorderContainer as="h2">Food</FlexBorderContainer>
        <section className="floatCards">
          <ItemCard 
            imgLabel="killens"
            title="Killen's BBQ"
            />
          <ItemCard 
            imgLabel="lupe"
            title="Lupe Tortilla"
            />
          <ItemCard 
            imgLabel="whataburger"
            title="Whataburger"
            />
          <ItemCard 
            imgLabel="tinys"
            title="Tiny’s Milk and Cookies"
            />
        </section>
      </article>
      <article id="flights">
        <FlexBorderContainer as="h2">Flights</FlexBorderContainer>
        <p>We anticipate that a large percentage of guests, especially those from South Carolina, will be flying in for the wedding. To give a general idea of airline prices, we gathered these tables of round-trip flight prices into the two airports in Houston. As always, airline prices will fluctuate from day-to-day. The trip priced is the cheapest available set of tickets from each airline-airport pairing on May 13, 2021.</p>
        <details open>
          <summary>
            <h4>Flights into                  
              <OverlayTrigger
                overlay={houTip}
                delay={{show:250, hide: 350}}>
                <span> HOU</span>
              </OverlayTrigger>
            </h4>
          </summary>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>
                  <OverlayTrigger
                    overlay={myrTip}
                    delay={{show:250, hide: 350}}>
                    <span>MYR</span>
                  </OverlayTrigger>
                </th>
                <th>
                  <OverlayTrigger
                    overlay={chsTip}
                    delay={{show:250, hide: 350}}>
                    <span>CHS</span>
                  </OverlayTrigger>
                </th>
                <th>
                  <OverlayTrigger
                    overlay={gspTip}
                    delay={{show:250, hide: 350}}>
                    <span>GSP</span>
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Southwest</th>
                <td className="usd">356</td>
                <td className="usd">316</td>
                <td className="ns-flight usd">296</td>
              </tr>
              <tr>
                <th>Delta</th>
                <td className="usd">405</td>
                <td className="usd">383</td>
                <td className="usd">353</td>
              </tr>
              <tr>
              <th>American Airlines</th>
                <td className="usd">375</td>
                <td className="usd">375</td>
                <td className="usd">343</td>
              </tr>
            </tbody>
          </Table>
          * The flight from GSP into HOU on Southwest is a nonstop flight.
        </details>
        <details open>
          <summary>
            <h4>Flights into                  
              <OverlayTrigger
                overlay={iahTip}
                delay={{show:250, hide: 350}}>
                <span> IAH</span>
              </OverlayTrigger>
            </h4>
          </summary>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>
                  <OverlayTrigger
                    overlay={myrTip}
                    delay={{show:250, hide: 350}}>
                    <span>MYR</span>
                  </OverlayTrigger>
                </th>
                <th>
                  <OverlayTrigger
                    overlay={chsTip}
                    delay={{show:250, hide: 350}}>
                    <span>CHS</span>
                  </OverlayTrigger>
                </th>
                <th>
                  <OverlayTrigger
                    overlay={gspTip}
                    delay={{show:250, hide: 350}}>
                    <span>GSP</span>
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Southwest</th>
                <td className="usd">356</td>
                <td className="usd">334</td>
                <td>N/A</td>
              </tr>
              <tr>
                <th>Delta</th>
                <td className="usd">405</td>
                <td className="usd">383</td>
                <td className="usd">353</td>
              </tr>
              <tr>
              <th>American Airlines</th>
                <td className="usd">352</td>
                <td className="usd">330</td>
                <td className="usd">311</td>
              </tr>
            </tbody>
          </Table>
        </details>
      </article>
    </main>
  );
}
