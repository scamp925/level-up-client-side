import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: {
    id: 0,
    label: '',
  },
};

const GameForm = ({ user, gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (gameObj.id) {
      setCurrentGame({
        skillLevel: gameObj.skill_level,
        numberOfPlayers: gameObj.number_of_players,
        title: gameObj.title,
        maker: gameObj.maker,
        gameTypeId: gameObj.game_type,
      });
    }
  }, [gameObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (gameObj.id) {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        number_of_players: Number(currentGame.numberOfPlayers),
        skill_level: Number(currentGame.skillLevel),
        game_type: Number(currentGame.gameTypeId.id),
        uid: user.uid,
      };
      updateGame(game, gameObj.id).then(() => router.push('/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        number_of_players: Number(currentGame.numberOfPlayers),
        skill_level: Number(currentGame.skillLevel),
        game_type: Number(currentGame.gameTypeId),
        uid: user.uid,
      };
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <Form.Label>Game Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
          <Form.Label>Skill Level Needed for This Game</Form.Label>
          <p>***Range between 1 to 10 with 1 being the minimum and 10 being the maxium***</p>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select
            name="gameTypeId"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameTypeId?.id}
            required
          >
            <option value="">Select Game Type</option>
            {
            gameTypes.map((gameType) => (
              <option
                defaultValue={gameType.id === currentGame.gameTypeId}
                key={gameType.id}
                value={gameType.id}
              >
                {gameType.label}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    skill_level: PropTypes.number,
    number_of_players: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: {},
};

export default GameForm;
