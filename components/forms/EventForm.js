import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button, Form, Col, Row,
} from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';

function EventForm({ user, eventObj }) {
  const [eventFormInput, setEventFormInput] = useState({
    game: '',
    description: '',
    date: '',
    time: '',
    organizer: user.uid,
  });
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((gameArray) => setGames(gameArray));

    if (eventObj.id) {
      setEventFormInput(eventObj);
    }
  }, [eventObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventObj.id) {
      updateEvent(user, eventFormInput, eventObj.id).then(() => router.push('/events'));
    } else {
      createEvent(user, eventFormInput).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Which Game Will Be Played?</Form.Label>
          <Form.Select
            name="game"
            onChange={handleChange}
            className="mb-3"
            value={eventFormInput.game?.id}
            required
          >
            <option value="">Select a Game</option>
            {
                games.map((game) => (
                  <option
                    defaultValue={game.id === eventFormInput.game}
                    key={game.id}
                    value={game.id}
                  >
                    {game.title}
                  </option>
                ))
              }
          </Form.Select>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Date (YYYY-MM-DD)</Form.Label>
              <Form.Control name="date" required value={eventFormInput.date} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Time (24-hour clock format)</Form.Label>
              <Form.Control name="time" required value={eventFormInput.time} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Form.Label>Description of Event</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            name="description"
            value={eventFormInput.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {eventObj?.id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      skillLevel: PropTypes.number,
      numberOfPlayers: PropTypes.number,
      title: PropTypes.string,
      maker: PropTypes.string,
      gameTypeId: PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }),
    }),
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.shape({
      id: PropTypes.number,
      bio: PropTypes.string,
      uid: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: {},
};

export default EventForm;
