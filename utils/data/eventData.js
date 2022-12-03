import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        game: data.game,
        description: data.description,
        date: data.date,
        time: data.time,
      });
    })
    .catch(reject);
});

const createEvent = (user, newEvent) => new Promise((resolve, reject) => {
  const eventObj = {
    game: Number(newEvent.game.id),
    description: newEvent.description,
    date: newEvent.date,
    time: newEvent.time,
    organizer: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(eventObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateEvent = (user, event, id) => new Promise((resolve, reject) => {
  const eventObj = {
    game: Number(event.game.id),
    description: event.description,
    date: event.date,
    time: event.time,
    organizer: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(eventObj),
  })
    .then((response) => resolve(response))
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

export {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
