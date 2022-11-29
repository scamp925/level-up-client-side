import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button, Form, Col, Row,
} from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

function EventForm({ user }) {
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: Number(eventFormInput.game),
      description: eventFormInput.description,
      date: eventFormInput.date,
      time: eventFormInput.time,
      organizer: user.uid,
    };
    console.warn(user);

    createEvent(event).then(() => router.push('/events'));
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
            required
          >
            <option value="">Select a Game</option>
            {
                games.map((game) => (
                  <option
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

            {/* <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Time</Form.Label>
              <Form.Select
                name="time"
                onChange={handleChange}
                required
              >
                <option>Select a Time</option>
                <option>...</option>
              </Form.Select>
            </Form.Group> */}

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
          Submit
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
