import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const GameCard = ({
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  id,
}) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>By: {maker}</Card.Text>
      <Card.Text>Skill Level: {skillLevel}</Card.Text>
      <Card.Text>{numberOfPlayers} players needed</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">
      <Button variant="link" href={`/games/edit/${id}`}>Edit</Button>
      <Button variant="link">Delete</Button>
    </Card.Footer>
  </Card>
);

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
};

export default GameCard;
