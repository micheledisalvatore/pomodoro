import React from 'react';

import { Button, PlayIcon, PauseIcon } from './Controller.style';

export const Controller = ({ isPaused, onClick }) => (
  <Button onClick={onClick}>
    { isPaused ? <PlayIcon /> : <PauseIcon /> }
  </Button>
);

