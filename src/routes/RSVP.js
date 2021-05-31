import React, {useState, useEffect} from 'react';
import { Alert, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// import axios from 'axios';

import { AppContext } from '../App';
import './RSVP.scss';

const formTranslations = Object.freeze({
  'Y': true,
  'N': false,
  'X': undefined
});

export default function RSVP() {
  // eslint-disable-next-line
  const [appState, dispatch] = React.useContext(AppContext);
  const [isPageReady, setIsPageReady] = useState(false);
  const [isInitialVisit, setIsInitialVisit] = useState(true); // TODO: user login state should return login_rsvp_confirmed T/F
  const [rsvpPhase, setRsvpPhase] = useState(appState.isAuthenticated ? 0 : -1);
  const [selfWillAttend, setSelfWillAttend] = useState(undefined);
  const [groupArray, setGroupArray] = useState([
    {
      name: 'Bennett Meares',
      isInPersonAttendee: true,
    }, {
      name: 'David Gleaton',
      isInPersonAttendee: true,
    },
  ]);

  const handleResetSession = () => {
    setIsPageReady(false);
    setIsInitialVisit(false);
    setRsvpPhase(appState.isAuthenticated ? 0 : -1);
    setSelfWillAttend(undefined);
    setGroupArray([]);
    console.log('RESET THE SESSION')
  };

  const advanceRsvpPhase = () => setRsvpPhase(n => n+1);

  useEffect(() => rsvpPhase === 1 && setTimeout(() => advanceRsvpPhase(), 2000), [rsvpPhase]);
  
  const handleSelfConfirmButton = answer => {
    setSelfWillAttend(answer);
    advanceRsvpPhase();
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    const formEntries = Array.from(e.target.elements).map(x => x.value);
    const formLabels = Array.from(e.target.elements).map(x => x.id);
    formEntries.pop(); formLabels.pop(); // omit submit button's info

    const attendanceUpdate = [];
    for(let i=0; i<formEntries.length; i++) {
      attendanceUpdate.push({
        name: formLabels[i],
        status: formTranslations[formEntries[i]]
      });
    }

    advanceRsvpPhase();
    console.log(attendanceUpdate);
    // axios.post form data .... THEN advanceRSVPphase
    setTimeout(() => advanceRsvpPhase(), 2000);
  };

  const BasicLoading = () => <p>loading your RSVP information...</p>;

  if(appState.isAuthenticated) {
    return (
      <main className="RSVP">
        {!isPageReady && <button onClick={() => setIsPageReady(true)}>Demo load</button>}
        <h2>Hello, {appState.name || appState.email}!</h2>

        {isInitialVisit ? <>
          {!isPageReady ? <BasicLoading /> :
          <>
            {rsvpPhase === 0 && <>
              <p>We found this RSVP information for you:</p>
              <article className="info">
                <strong>You're on the list!</strong>
                <p>Would you like to attend our wedding in person on <span className='no-break'>August 1, 2021</span> in Houston, Texas?</p>
                <button 
                  className="rsvpConfirm" 
                  id="rsvpYes"
                  onClick={() => handleSelfConfirmButton(true)}
                  >
                  YES!
                </button>
                <button 
                  className="rsvpConfirm" 
                  id="rsvpNo"
                  onClick={() => handleSelfConfirmButton(false)}
                  >
                  No, thanks
                </button>
              </article>
            </>}
            {(rsvpPhase === 1 || rsvpPhase === 3) && <p>updating RSVP data...</p>}
            {rsvpPhase === 2 && <>
              <article className="info">
                { selfWillAttend ? 
                  <strong>Awesome! We look forward to seeing you!</strong> :
                  <strong>Thank you for letting us know — we will miss you!</strong>
                }
                <p>Your RSVP response has been successfully recorded.</p>
                { groupArray.length > 0 && <form id="attendanceGroupRegistration" onSubmit={handleSubmitForm}>
                  <Alert variant='info'>
                    <p className="tight">We found these people who we expected to attend with you. Do you know if they are coming?</p>
                  </Alert>
                  <Table striped bordered>
                    <tbody>
                      {groupArray.map(person => <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>
                          <Form.Control id={person.name} defaultValue={selfWillAttend ? "Y" : "N"} as='select' custom>
                            <option value="Y">Yes, {person.name} will attend.</option>
                            <option value="N">No, {person.name} will not attend.</option>
                            <option value="X">I don't know.</option>
                          </Form.Control>
                        </td>
                      </tr>)}
                    </tbody>
                  </Table>
                  <button type="submit">Submit</button>
                </form>}
              </article>
            </>}
            {rsvpPhase === 4 && <>
              <strong>Thank you for updating our records.</strong>
              <p>The group RSVP response was successfully processed.</p>
              <button onClick={() => handleResetSession()}>View your submission</button>
            </> }
          </>}
        </> : <>
          { !isPageReady ? <BasicLoading /> :
            <>
            {rsvpPhase === 0 && <article className="info">
              Welcome back!
            </article>}
            </>
          }
        </>}
      </main>
    );
  } else {
    // replace with component!
    return <main className="login-gate">You need to log in to view this page!</main>
  }
}
