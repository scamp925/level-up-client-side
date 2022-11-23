import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
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
            <option value="">Select Game</option>
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
          <Form.Label>Game Maker</Form.Label>
          <Form.Control name="maker" required value={eventFormInput.maker} onChange={handleChange} />
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={eventFormInput.numberOfPlayers} onChange={handleChange} />
          <Form.Label>Skill Level Needed for This Game</Form.Label>
          <p>***Range between 1 to 10 with 1 being the minimum and 10 being the maxium***</p>
          <Form.Control name="skillLevel" required value={eventFormInput.skillLevel} onChange={handleChange} />
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
