import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { Client } from 'boardgame.io/react';
import { Truco } from './Game';
import { TrucoBoard2 } from './Board2';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Debug } from 'boardgame.io/debug';

const TrucoClient = Client({
  game: Truco,
  board: TrucoBoard2,
numPlayers: 6,
  multiplayer: SocketIO({ server: 'https://trucoapp-server.onrender.com' }),

});
 
const App = () => (

      <TrucoClient playerID="0" />

  
);
export default App;
