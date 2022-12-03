import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventForm from '../../../components/forms/EventForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditEvent() {
  const { user } = useAuth();
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [user, id]);

  return (
    <div>
      <EventForm user={user} eventObj={editEvent} />
    </div>
  );
}
