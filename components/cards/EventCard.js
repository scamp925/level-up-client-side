import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent } from '../../utils/data/eventData';

function EventCard({
  id,
  game,
  description,
  date,
  time,
  organizer,
  onUpdate,
}) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisEvent = () => {
    if (window.confirm('Heads up! You are about to permanently delete this event. Click "OK" if you wish to continue.')) {
      deleteEvent(id).then(() => onUpdate()).then(() => {
        router.push('/events');
      });
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="text-center">{game?.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><b>Description of Event:</b> {description}</ListGroup.Item>
        <ListGroup.Item><b>Happening:</b> {date} at {time}</ListGroup.Item>
        <ListGroup.Item><b>Organized by:</b> {organizer?.uid === user.fbUser.uid ? user.fbUser.displayName : ''}</ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-muted text-center">
        <Button variant="link" href={`/events/edit/${id}`}>Edit</Button>
        <Button variant="link" onClick={deleteThisEvent}>Delete</Button>
      </Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
