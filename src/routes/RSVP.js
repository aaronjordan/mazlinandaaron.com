import React, {useState, useEffect} from 'react';
import { Alert, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import RequireLogin from '../layout/RequireLogin';
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
  const [selfData, setSelfData] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [isInitialVisit, setIsInitialVisit] = useState(true); // TODO: user login state should return login_rsvp_confirmed T/F
  const [rsvpPhase, setRsvpPhase] = useState(appState.isAuthenticated ? 0 : -1);
  const [selfWillAttend, setSelfWillAttend] = useState(undefined);
  const [groupArray, setGroupArray] = useState([]);

  const advanceRsvpPhase = () => setRsvpPhase(n => n+1);

  const handleResetSession = () => {
    setIsInitialVisit(false);
    setRsvpPhase(appState.isAuthenticated ? 0 : -1);
    setSelfWillAttend(undefined);
    setGroupArray([]);
    console.log('RESET THE SESSION')
  };

  useEffect(() => {
    appState.isAuthenticated && axios.get('/node/rsvp/self', {
      withCredentials: true
    }).then((res) => {
      if(res.data) {
        setSelfData(res.data.self || {});
        setRsvpPhase(0);
        setIsInitialVisit(!res.data.self?.rsvp_received);
      } else {
        console.log('No data was returned.');
        setPageError('No data returned at /self call');
      }
    }).catch(e => {
      const { status='', data='' } = e.response;
      setPageError(`The /self call failed with an error code.   Error ${status}: ${data}`);
      console.error('rsvp/self call failed.');
      console.log(e);
    });
  }, [setSelfData, setRsvpPhase, appState.isAuthenticated]);

  useEffect(() => rsvpPhase === 1 && setTimeout(() => advanceRsvpPhase(), 2000), [rsvpPhase]);
  
  const handleRegisterUserButton = answer => {
    setSelfWillAttend(answer);
    advanceRsvpPhase();
  };

  const handleSelfConfirmButton = answer => {
    setSelfWillAttend(answer);
    
    const requests = [
      axios.post('/node/rsvp/self', {
        id: selfData.id,
        inPerson: answer,
      }).then(res => {
        console.log('Updated RSVP information for user ' + selfData.id);
      }).catch(e => {
        const { status='', data='' } = e.response;
        setPageError(`The /self post call failed with an error code.   Error ${status}: ${data}`);
        console.error('rsvp/self post call failed.');
        console.log(e);
      }),
      axios.get('/node/rsvp/group?id=' + selfData?.id)
        .then(res => {
          setGroupArray(res.data?.group);
        }).catch(e => {
        const { status='', data='' } = e.response;
        setPageError(`The /group call failed with an error code.   Error ${status}: ${data}`);
        console.error('rsvp/group post call failed.');
        console.log(e);
      })
    ];

    Promise.all(requests).then(() => advanceRsvpPhase());
  };

  const handleSubmitGroupForm = e => {
    e.preventDefault();

    const formEntries = Array.from(e.target.elements).map(x => x.value);
    const formLabels = Array.from(e.target.elements).map(x => x.id);
    formEntries.pop(); formLabels.pop(); // omit submit button's info

    const attendanceUpdate = [];
    for(let i=0; i<formEntries.length; i++) {
      formTranslations[formEntries[i]] !== undefined && attendanceUpdate.push({
        id: parseInt(formLabels[i]),
        in_person: formTranslations[formEntries[i]]
      });
    }

    advanceRsvpPhase();
    console.log(attendanceUpdate);
    
    // submit form only if data set is not empty
    if (attendanceUpdate.length) {
      axios.post('/node/rsvp/group', attendanceUpdate, {withCredentials: true})
        .then(() => void advanceRsvpPhase())
        .catch(e => {
          const { status='', data='' } = e.response;
          setPageError(`The /group call failed with an error code. Error ${status}: ${data}`);
          console.error('rsvp/group post call failed.');
          console.log(e);
        });
    } else advanceRsvpPhase();

  };

  const BasicLoading = () => <p>loading your RSVP information...</p>;

  if(appState.isAuthenticated && !pageError) {
    return (
      <main className="RSVP">
        <h2>Hello, {appState.name || appState.email}!</h2>

        {isInitialVisit ? <>
          {!selfData ? <BasicLoading /> :
          <>
            {rsvpPhase === 0 && (selfData.stream_only || !selfData.id ? <>
              <article className="info">
                <strong>Looks like you're not registered yet!</strong>
                <p>Would you like to register? By doing so, you'll be able to watch the livestream of our wedding on the day of, plus we may contact you in the meantime if room for attendance in person opens up!</p>
                <button 
                  className="rsvpConfirm" 
                  id="rsvpYes"
                  onClick={() => handleRegisterUserButton(true)}
                  >
                  Sign me up!
                </button>
                <button 
                  className="rsvpConfirm" 
                  id="rsvpNo"
                  onClick={() => handleRegisterUserButton(false)}
                  >
                  No, thanks
                </button>
              </article>
            </> : <>
              <p>We found this RSVP information for you:</p>
              <article className="info">
                <strong>You're on the list!</strong>
                <p>Will you be attending our wedding in person on <span className='no-break'>August 1, 2021</span> in Houston, Texas?</p>
                <button 
                  className="rsvpConfirm primary" 
                  id="rsvpYes"
                  onClick={() => handleSelfConfirmButton(true)}
                  >
                  YES!
                </button>
                <button 
                  className="rsvpConfirm secondary" 
                  id="rsvpNo"
                  onClick={() => handleSelfConfirmButton(false)}
                  >
                  No, thanks
                </button>
              </article>
            </>)}
            {(rsvpPhase === 1 || rsvpPhase === 3) && <p>updating RSVP data...</p>}
            {rsvpPhase === 2 && <>
              <article className="info">
                { !selfData.id ? <>
                  { 
                    // IF we update selfData with registration then this will never render.
                    // we can just send users back when they get to rsvpPhase 2....
                    // would be better than branching forms by a lot....
                  }
                </> : <>
                  { selfWillAttend ? 
                    <strong>Awesome! We look forward to seeing you!</strong> :
                    <strong>Thank you for letting us know — we will miss you!</strong>
                  }
                  <p>Your RSVP response has been successfully recorded.</p>
                </>}
                { groupArray.length > 0 && <form id="attendanceGroupRegistration" onSubmit={handleSubmitGroupForm}>
                  <Alert variant='info'>
                    <p className="tight">We found these people who we expected to attend with you. Do you know if they are coming?</p>
                  </Alert>
                  <Table striped bordered>
                    <tbody>
                      {groupArray.map(person => <tr key={person.full_name}>
                        <td>{person.full_name}</td>
                        <td>
                          <Form.Control id={person.id} defaultValue={selfWillAttend ? "Y" : "N"} as='select' custom>
                            <option value="Y">Yes, {person.full_name} will attend.</option>
                            <option value="N">No, {person.full_name} will not attend.</option>
                            <option value="X">I don't know.</option>
                          </Form.Control>
                        </td>
                      </tr>)}
                    </tbody>
                  </Table>
                  <button className="rsvpConfirm primary" type="submit">Submit</button>
                </form>}
              </article>
            </>}
            {rsvpPhase === 4 && <>
              <strong>Thank you for updating our records.</strong>
              <p>The group RSVP response was successfully processed.</p>
              <button className="rsvpConfirm primary" onClick={() => handleResetSession()}>View your submission</button>
            </> }
          </>}
        </> : <>
          { !selfData ? <BasicLoading /> :
            <>
            {rsvpPhase === 0 && <article className="info">
              <p>Welcome back!</p>
              <p>{'<< add dynamic confirmation info here for user + group >>'}</p>
              <p>Need to change something? 
                <span 
                  className="return-button"
                  onClick={() => setIsInitialVisit(true)}
                  >Click here to do that!</span>
              </p>
            </article>}
            </>
          }
        </>}
      </main>
    );
  } else if (pageError) {
    return <p className="error-body">{pageError}</p>;
  } else {
    // replace with component!
    return <main className="login-gate"><RequireLogin /></main>;
  }
}
