import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent } from '../../utils/data/eventData';

function EventCard({ eventObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisEvent = () => {
    if (window.confirm('Heads up! You are about to permanently delete this event. Click "OK" if you wish to continue.')) {
      deleteEvent(eventObj.id).then(() => onUpdate()).then(() => {
        router.push('/events');
      });
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="text-center">{eventObj.game?.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><b>Description of Event:</b> {eventObj.description}</ListGroup.Item>
        <ListGroup.Item><b>Happening:</b> {eventObj.date} at {eventObj.time}</ListGroup.Item>
        <ListGroup.Item><b>Organized by:</b> {eventObj.organizer?.uid === user.fbUser.uid ? user.fbUser.displayName : ''}</ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-muted text-center">
        <Button variant="link" href={`/events/edit/${eventObj.id}`}>Edit</Button>
        <Button variant="link" onClick={deleteThisEvent}>Delete</Button>
      </Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
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
    }),
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
