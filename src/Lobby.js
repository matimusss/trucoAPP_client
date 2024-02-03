// LobbyComponent.js

import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { Truco } from './Game';
import { Truco } from './Board';

const LobbyComponent = () => (
  <Lobby
    gameServer={`https://${window.location.hostname}:8000`}
    lobbyServer={`https://${window.location.hostname}:8000`}
    gameComponents={[
      { game: Truco, board: TrucoBoard }
    ]}
  />
);

export default LobbyComponent;
