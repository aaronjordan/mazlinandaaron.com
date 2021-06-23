import React, {useState, useEffect} from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './AdminHub.scss';

const peopleTableHeaders = ['ID', 'GID', 'Name', 'Contact Email', 'Address'];
const PeopleTable = props => (
  <Table striped borderless>
    <thead><tr>{ peopleTableHeaders.map((t, i) => <th key={i}>{t}</th>) }</tr></thead>
    <tbody>{
      props.set?.map((person, idx) => <tr key={idx}>
        <td>{person.id}</td>
        <td>{person.contact_group}</td>
        <td className='name'>{person.full_name}</td>
        <td>{person.email}</td>
        <td className="addr">{person.address}</td>
      </tr>)
    }</tbody>
  </Table>
);

const SessionsTable = props => (
  <Table striped borderless>
    <thead><tr><th>Email</th></tr></thead>
    <tbody>{ props.set?.map((e, i) => <tr key={i}><td>{e}</td></tr>) }</tbody>
  </Table>
);

const RegistrationsTable = props => (
  <Table striped borderless>
    <thead><tr><th>Name</th><th>Email</th></tr></thead>
    <tbody>{ props.set?.map((p, i) => <tr key={i}>
      <td>{p.name}</td>
      <td>{p.email}</td>
    </tr>)}</tbody>
  </Table>
);

export const AdminLinkButton = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    axios.get('/node/user-type')
      .then(res => res.data && res.data.admin === true && setUserIsAdmin(true))
      .catch(() => { /* fail silently if error occurs */ });
  }, [setUserIsAdmin]);

  return userIsAdmin ? <Link to="/admin-panel" className="menu-admin-link">Admin Settings</Link> : null;
};

const AdminHub = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [peopleRecords, setPeopleRecords] = useState([]);
  const [newRecords, setNewRecords] = useState(null);
  const [sessionRecords, setSessionRecords] = useState(null);

  useEffect(() => {
    axios.get('/node/user-type')
      .then(res => {
        if (res.data && res.data.admin === true) {
          setUserIsAdmin(true);
          axios.get('/node/admin/people')
            .then(res => setPeopleRecords(res.data.people))
            .catch(() => console.error('failed to fetch people for admin user'))
        } else {
          document.location.replace('/');
        }
      })
      .catch(() => { /* fail silently if error occurs */ });
  }, [setUserIsAdmin, setPeopleRecords]);

  const handleSessionGet = () => {
    axios.get('/node/admin/sessions')
      .then(res => setSessionRecords(res.data.sessions))
      .catch(() => console.error('failed to fetch sessions for admin user'))
};

  const handleRegistrationGet = () => {
    axios.get('/node/admin/new-people')
      .then(res => setNewRecords(res.data.newPeople))
      .catch(() => console.error('failed to fetch registrations for admin user'))
  };

  const handleTabChange = (e) => {
    switch (e) {
      case 'sessions':
        !sessionRecords && handleSessionGet();
        break;
      case 'registrations':
        !newRecords && handleRegistrationGet();
        break;
      default:
    }
  };

  if (userIsAdmin === true) {
    return (
      <main className="admin-panel">
        <Tabs 
          defaultActiveKey='coming' 
          id='admin-panel-tabs'
          onSelect={handleTabChange} >
          <Tab eventKey='coming' title='Coming'>
            <PeopleTable set={peopleRecords.filter(p => p.in_person === 1 && p.rsvp_received === 1)} />
          </Tab>
          <Tab eventKey='not-coming' title='Not Coming'>
            <PeopleTable set={peopleRecords.filter(p => p.in_person === 0 && p.rsvp_received === 1)} />
          </Tab>
          <Tab eventKey='unconfirmed' title='Unconfirmed'>
            <PeopleTable set={peopleRecords.filter(p => p.in_person === 1 && p.rsvp_received !== 1)} />
          </Tab>
          <Tab eventKey='sessions' title='Sessions'>
            { sessionRecords ? <SessionsTable set={sessionRecords} /> : <p>loading...</p> }
          </Tab>
          <Tab eventKey='registrations' title='New Registrations'>
            { newRecords ? <RegistrationsTable set={newRecords} /> : <p>loading...</p> }
          </Tab>
        </Tabs>
      </main>
    );
  } else {
    return <p></p>;
  }
};

export default AdminHub;