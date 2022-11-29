import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameForm from '../../../components/forms/GameForm';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditGame() {
  const [editGame, setEditGame] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);

  return (
    <div>
      <GameForm user={editGame} />
    </div>
  );
}
