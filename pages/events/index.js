import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getEvents } from '../../utils/data/eventData';
import EventCard from '../../components/cards/EventCard';

export default function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((eventsArray) => {
      setEvents(eventsArray);
    });
  }, []);

  return (
    <article>
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map(((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} />
        </section>
      )))}
    </article>
  );
}
