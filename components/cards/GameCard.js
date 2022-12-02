import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const GameCard = ({ gameObj }) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Title>{gameObj.title}</Card.Title>
      <Card.Text>By: {gameObj.maker}</Card.Text>
      <Card.Text>Skill Level: {gameObj.skillLevel}</Card.Text>
      <Card.Text>{gameObj.numberOfPlayers} players needed</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">
      <Button variant="link" href={`/games/edit/${gameObj.id}`}>Edit</Button>
      <Button variant="link">Delete</Button>
    </Card.Footer>
  </Card>
);

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    gamer: PropTypes.shape({
      id: PropTypes.number,
      bio: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
};

export default GameCard;
