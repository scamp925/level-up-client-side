import React, { useEffect, useState } from 'react';
import { getEvents } from '../../utils/data/eventData';
import EventCard from '../../components/cards/EventCard';

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);

  // const getAllEvents = () => {
  //   getEvents().then((eventsArray) => {
  //     setEvents(eventsArray);
  //   });
  // };

  useEffect(() => {
    getEvents().then((eventsArray) => {
      setEvents(eventsArray);
    });
  }, []);

  return (
    <article>
      <h1>Events</h1>
      {events.map(((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} />
        </section>
      )))}
    </article>
  );
}
