import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

function GameCard({
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  id,
  onUpdate,
}) {
  const router = useRouter();

  const deleteThisGame = () => {
    if (window.confirm(`Heads up! You are about to permanently delete ${title}. Click "OK" if you wish to continue.`)) {
      deleteGame(id).then(() => onUpdate()).then(() => {
        router.push('/games');
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>By: {maker}</Card.Text>
        <Card.Text>Skill Level: {skillLevel}</Card.Text>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Button variant="link" href={`/games/edit/${id}`}>Edit</Button>
        <Button variant="link" onClick={deleteThisGame}>Delete</Button>
      </Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
