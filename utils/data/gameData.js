import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        skillLevel: data.skill_level,
        numberOfPlayers: data.number_of_players,
        title: data.title,
        maker: data.maker,
        gameTypeId: data.game_type,
      });
    })
    .catch(reject);
});

const createGame = (user, game) => new Promise((resolve, reject) => {
  const gameObj = {
    maker: game.maker,
    title: game.title,
    number_of_players: Number(game.numberOfPlayers),
    skill_level: Number(game.skillLevel),
    game_type: Number(game.gameTypeId.id),
    uid: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(gameObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateGame = (user, game, id) => new Promise((resolve, reject) => {
  const gameObj = {
    maker: game.maker,
    title: game.title,
    number_of_players: Number(game.numberOfPlayers),
    skill_level: Number(game.skillLevel),
    game_type: Number(game.gameTypeId.id),
    uid: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(gameObj),
  })
    .then((response) => resolve(response))
    .catch(reject);
});

const deleteGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getGames,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame,
  getGameTypes,
};
