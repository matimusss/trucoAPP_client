import { Stage } from 'boardgame.io/core';
import { TurnOrder } from 'boardgame.io/core';
import * as functions from './functions.js';


const quiero = ({ G, ctx, events, playerID }) => {

    let teamActual1 = chkTeams(G.teams[0].players, G.teams[1].players, playerID);
  let teamActual = Number(teamActual1);
  
    if (ctx.activePlayers && (ctx.activePlayers[0] === 'waiting' || ctx.activePlayers[1] === 'waiting')) {
     console.log('El jugador 0 o el jugador 1 están en el stage "waiting".');
     //ya jugo carta
      if (G.teams[teamActual].cantado === "truco") {
        console.log("Quiso el truco");
        G.stTruco = "truco";
        events.endStage("respuestaTruco");
        events.endStage("estadoNatural");
        G.handCount += 1;
        events.endTurn();
      } 
    }
  
  //no jugo carta
    else  {
       console.log("no esta en waiting");
      if (G.teams[teamActual].cantado === "truco") {
      console.log("Quiso el truco");
      G.stTruco = "truco";
      events.endStage("respuestaTruco");
      events.setActivePlayers({ other: Stage.NULL });
      G.teams[teamActual].cantado  = "";
    }
  
  
    if (G.teams[teamActual].cantado === "envido") { // cualquier caso de envido
    console.log("Quiso el envido");
    G.stEnvido = "envido";
    events.endStage("respuestaEnvido");
    G.teams[teamActual].cantado = "";
    //codigo para comparar valores del envido querido       
    const valorEnvidoPlayer0 = chkEnvido(G.players[0].hand);
    const valorEnvidoPlayer1 = chkEnvido(G.players[1].hand);  
  
    console.log('Valor de envido del Jugador 0:', valorEnvidoPlayer0);
    console.log('Valor de envido del Jugador 1:', valorEnvidoPlayer1);
  
    if (valorEnvidoPlayer0 > valorEnvidoPlayer1) {
    G.players[0].ptsGeneral += 1;
    console.log('Gana Jugador 0');
    } else if (valorEnvidoPlayer1 > valorEnvidoPlayer0) {
    G.players[1].ptsGeneral += 1;
    console.log('Gana Jugador 1');
    } else {
    console.log('Empate en el envido');
    // Realiza alguna acción adicional en caso de empate en el envido
    var esMano = chkMano();
    G.players[esMano].ptsGeneral +=1;
    console.log("gano player " + esMano + "por ser mano.");
    }
    // Actualiza el estado del juego y pasa a la siguiente etapa
    G.stEnvido = 'resuelto'; // Actualiza el estado de stEnvido
    events.endStage(); // Finaliza esta etapa y pasa a la siguiente
    }
    }  
  }
  
  
  
  
  
  
  
  
  
  
  
  const noQuiero = ({ G, ctx, events, playerID }) => {
  if (G.players[playerID].cantado === "truco") {
  console.log("No Quiso el TRUC");
  G.stTruco = "truco";
  events.endStage();
  }
  if (G.players[playerID].cantado === "envido") {
  console.log("No Quiso el ENVID ");
  G.stEnvido = "envido";
  events.endStage();
  }
  } 
  
  
  
  
  
  
  
  
  
  const alMazo = ({ G, ctx, events }) => {
  console.log("al mazo");  //etc
  } 
  
  
  
  
  
  
  
  
  
  const cantaTruco2 = ({ G, ctx, events, playerID }) => {
  
  
  
  
    // Conseguir id de equipo del jugador actual
    let teamActual = chkTeams(G.teams[0].players, G.teams[1].players, playerID);
    // Conseguir id contraria
    let teamOther = teamActual === 0 ? 1 : 0;
    // Cargar los arrays con los jugadores de team actual y el otro equipo
    let idsTeamActual = [...G.teams[teamActual].players];
    let idsTeamOther = [...G.teams[teamOther].players];
    let stages = [];
    let PID = Number(playerID);
    let pie = chkPie(ctx.numPlayers, G.roundCount, G.teams[0].players, G.teams[1].players);
    // Pie0 es el de team 0 y pie 1 el de team1
    let pieOther = pie[teamOther];
    // Quitar al pie del otro equipo del array, ya que va a otro stage
    let indexToRemove = idsTeamOther.indexOf(pieOther);
    if (indexToRemove !== -1) {
      idsTeamOther.splice(indexToRemove, 1);
    }
    // Quitar a este jugador ya que va a otro stage
    let indexToRemove2 = idsTeamActual.indexOf(PID);
    if (indexToRemove2 !== -1) {
      idsTeamActual.splice(indexToRemove2, 1);
    }
    // Agrego a todos los elementos del team actual a su stage
    idsTeamActual.forEach((index) => {
      stages[index] = "waiting";
    });
    // Agrego a todos los elementos del team actual a su stage
    idsTeamOther.forEach((index) => {
      stages[index] = "estadoNatural";
    });
    // Agrego al pie a su stage
    stages[pieOther] = "respuestaTruco";
      // Agrego al actual a su stage
      stages[PID] = "estadoNatural";
    G.teams[teamOther].cantado = "truco";
    // Luego, puedes usar este objeto en setActivePlayers
    events.setActivePlayers({
      value: {
        '0': stages[0],
        '1': stages[1],
        '2': stages[2],
        '3': stages[3],
        '4': stages[4],
        '5': stages[5],
      },
    });
  
  
  
  
      
  };
  
    
  
  
  const cantaTruco =   ({G, ctx, events, playerID }) => {
  console.log("cantatruco");
  const other = Number(playerID) === 0 ? 1 : 0;
  //si el otro jugador tenia cantaod tambien el envido, hacer otra cosa,
  
  G.players[other].cantado = "truco";
  
  events.setActivePlayers({
  currentPlayer: 'estadoNatural', 
  });}
  
  
  
  const cantaRetruco =   ({G, ctx, events }) => {
  }
  const cantaReal =   ({G, ctx, events }) => {
  }
  const cantaVale4 =   ({G, ctx, events }) => {
  }
  
  
  
  
  
  
  const cantaEnvido =   ({G, ctx, events,playerID }) => {
  if (G.players[playerID].cantado === "truco") {
  console.log("canto el envido esta primero ");
  const other = Number(playerID) === 0 ? 1 : 0;
  G.players[other].cantado = "envido";
  events.setActivePlayers({
  currentPlayer: 'respuestaEnvido',
  others: 'respuestaTruco',
  minMoves: 1,
  });}
  
  
  if (G.players[playerID].cantado === "") {
  console.log("cantaenvido");
  const other = Number(playerID) === 0 ? 1 : 0;
  G.players[other].cantado = "envido";
  events.setActivePlayers({
  others: 'respuestaEnvido',
  minMoves: 1
  });}
  }
  
  
  
  const cantaEnvidoEnvido =  ({G, ctx, events }) => {
  }
  const cantaEnvidoReal  =  ({G, ctx, events }) => {
  }
  const cantaEnvidoFalta = ({G, ctx, events }) => {
  }
  const cantaFalta =   ({G, ctx, events }) => {
  }
  const cantaRealFalta =   ({G, ctx, events }) => {
  }
  const cantaEnvidoEnvidoReal =   ({G, ctx, events }) => {
  }
  const cantaEnvidoRealFalta =   ({G, ctx, events }) => {
  }
  const cantaEnvidoEnvidoRealFalta =   ({G, ctx, events }) => {
  }
  const cantaFlor =   ({G, ctx, events }) => {
  }
  const cantaContraFlor =   ({G, ctx, events }) => {
  }
  const cantaContraFlorResto =   ({G, ctx, events }) => {
  }
  const cantaConFlorAchico =   ({G, ctx, events }) => {
  }
  
  
  
  
  
  
  
  
  const jugarCarta = ({ G, ctx, events, playerID }, asd) => {    
  
  
  
  
  
  console.log(ctx);
  
  
  const cardToPlay = G.players[playerID].hand[asd];
  console.log("Jugador" + playerID + "  jugo la carta  " + G.players[playerID].hand[asd].palo + "  " +  G.players[playerID].hand[asd].numero  )    
  G.players[playerID].playedCards.push(cardToPlay);
  G.players[playerID].hand.splice(asd, 1);
  
  let handCount = G.handCount;
  let puntosEquipo0 = G.teams[0].ptsRonda;
  let puntosEquipo1 = G.teams[1].ptsRonda;
  let ind0 = G.teams[0].players;
  let ind1 = G.teams[1].players;
  let RndChk =[];
  let numPlayers = ctx.numPlayers;
  let cards = [];
  
  if (numPlayers === 2) {
  RndChk = [1, 3, 5];
  } else if (numPlayers === 4) {
  RndChk = [3, 7, 11];
  } else if (numPlayers === 6) {
  RndChk = [5, 11, 17];
  }
  
  
  //si es ronda para chekear puntajes,  
  if (handCount === RndChk[0]  || handCount === RndChk[1] || handCount === RndChk[2]) {
  console.log(`Estás en la ronda ${handCount}`);
  
  let roundIndex; // conigo el index de playedCards para la ronda. 
  if (handCount === RndChk[0]) { roundIndex = 0;}
  if (handCount === RndChk[1]) { roundIndex = 1;}
  if (handCount === RndChk[2]) { roundIndex = 2;}
  
  
  
  
  cards = [G.players[0].playedCards[roundIndex],G.players[1].playedCards[roundIndex],G.players[2].playedCards[roundIndex],G.players[3].playedCards[roundIndex],G.players[4].playedCards[roundIndex],G.players[5].playedCards[roundIndex] ]
  var result = chkCarta(ind0, ind1, cards, numPlayers);    
  var ganoTeam = result[0];
  var gano = result[1];
  
  cards =[]; //vacio cards ,ya lo use
  
  //pongo los puntos segun corresponda
  if (ganoTeam === '0') {
  G.teams[0].ptsRonda += 1;        
  puntosEquipo0 += 1; 
  } else if (ganoTeam === '1') {
  G.teams[1].ptsRonda += 1;
  puntosEquipo1 += 1;
  } else {
  G.teams[0].ptsRonda += 1;  
  G.teams[1].ptsRonda += 1;
  puntosEquipo0 += 1;
  puntosEquipo1 += 1;
  } 
  
  //teniendo los puntos asignados chekeo la ronda, a ver que pasa
  let mind = chkRonda(G,ctx , puntosEquipo0, puntosEquipo1, gano);
  //chkRodna devuelve los objetos actualizados:
  G.teams[0].ptsGeneral = mind.puntosGralEquipo0;
  G.teams[1].ptsGeneral = mind.puntosGralEquipo1;
  G.teams[0].ptsRonda = mind.puntosEquipo0;
  G.teams[1].ptsRonda = mind.puntosEquipo1;
  G.handCount = mind.handCount;
  G.roundCount = mind.roundCount;
  
  //iteracion
  G.players[0].playedCards = mind.playedCardsPlayer0;
  G.players[0].hand = mind.handPlayer0;
  G.players[1].playedCards = mind.playedCardsPlayer1;
  G.players[1].hand = mind.handPlayer1;
  G.players[2].playedCards = mind.playedCardsPlayer2;
  G.players[2].hand = mind.handPlayer2;
  G.players[3].playedCards = mind.playedCardsPlayer3;
  G.players[3].hand = mind.handPlayer3;
  G.players[4].playedCards = mind.playedCardsPlayer4;
  G.players[4].hand = mind.handPlayer4;
  G.players[5].playedCards = mind.playedCardsPlayer5;
  G.players[5].hand = mind.handPlayer5;
  events.endTurn({ next: mind.next });
  console.log("Próximo jugador: " + mind.next);
  }
  else { 
  //rondas no check.
  console.log(`Estás en la ronda ${handCount}`);
  G.handCount += 1;
  events.endTurn();
  }
  return G;                                             //ACTUALIZO G.
  }
  
  const jugarCartaNEnd = ({ G, ctx, events, playerID }, asd) => {
  //obtiene carta la agrega a played y la elimina de la mano
  const cardToPlay = G.players[playerID].hand[asd];     
  G.players[playerID].playedCards.push(cardToPlay);
  G.players[playerID].hand.splice(asd, 1);
  events.endStage("estadoNatural");
  events.setStage("waiting");
  }
  
  const darCartasInicial = ({ G, ctx, playerID }) => {
  let numPlayers = ctx.numPlayers;
  const [cartasJugador1, cartasJugador2, cartasJugador3, cartasJugador4, cartasJugador5, cartasJugador6] = repartirCartas(G.cartasTruco, numPlayers);
  
  G.handCount = 0;
  G.stTruco = "";
  G.stEnvido = "";
  G.teams[0].cantado = "";
  G.teams[1].cantado = "";
  G.teams[1].ptsRonda = 0;
  G.teams[0].ptsRonda = 0;  
  
  G.players[0].hand = cartasJugador1;
  G.players[0].playedCards = [];
  G.players[1].hand = cartasJugador2;
  G.players[1].playedCards = [];
  G.players[2].hand = cartasJugador3;
  G.players[2].playedCards = [];
  G.players[3].hand = cartasJugador4;
  G.players[3].playedCards = [];
  G.players[4].hand = cartasJugador5;
  G.players[4].playedCards = [];
  G.players[5].hand = cartasJugador6;
  G.players[5].playedCards = [];
  
  };
  
  const darCartas = ({ G, ctx, playerID }) => {
  let numPlayers = ctx.numPlayers;
  const [cartasJugador1, cartasJugador2, cartasJugador3, cartasJugador4, cartasJugador5, cartasJugador6] = repartirCartas(G.cartasTruco, numPlayers);
  G.handCount = 0;
  G.roundCount +=1;
  G.stTruco = "";
  G.stEnvido = "";
  G.teams[0].cantado = "";
  G.teams[1].cantado = "";
  G.teams[0].ptsRonda = 0;  
  G.teams[1].ptsRonda = 0;
  
  G.players[0].hand = cartasJugador1;
  G.players[0].playedCards = [];
  G.players[1].hand = cartasJugador2;
  G.players[1].playedCards = [];
  G.players[2].hand = cartasJugador3;
  G.players[2].playedCards = [];
  G.players[3].hand = cartasJugador4;
  G.players[3].playedCards = [];
  G.players[4].hand = cartasJugador5;
  G.players[4].playedCards = [];
  G.players[5].hand = cartasJugador6;
  G.players[5].playedCards = [];
  
  };
  
  const darCartasDebug = ({ G, ctx, playerID }) => {
  const cartasEspecificasJugador1 = [12, 20, 8]; // Índices de las cartas para el jugador 1
  const cartasEspecificasJugador2 = [12, 8, 20]; // Índices de las cartas para el jugador 2
  const cartasEspecificasJugador3 = [12, 8, 20]; // Índices de las cartas para el jugador 3
  const cartasEspecificasJugador4 = [12, 8, 20]; // Índices de las cartas para el jugador 4
  const cartasEspecificasJugador5 = [12, 8, 20]; // Índices de las cartas para el jugador 3
  const cartasEspecificasJugador6 = [12, 8, 20]; // Índices de las cartas para el jugador 4
  G.handCount = 0; // Reiniciar la cuenta de mano
  G.teams[0].ptsRonda = 0;
  G.teams[1].ptsRonda = 0;
  // Definir cartas específicas para el jugador 2
  
  G.players[5].hand = cartasEspecificasJugador6.map(index => G.cartasTruco[index]);
  G.players[5].playedCards = [];
  
  G.players[4].hand = cartasEspecificasJugador5.map(index => G.cartasTruco[index]);
  G.players[4].playedCards = [];
  G.players[3].hand = cartasEspecificasJugador4.map(index => G.cartasTruco[index]);
  G.players[3].playedCards = [];
  G.players[2].hand = cartasEspecificasJugador3.map(index => G.cartasTruco[index]);
  G.players[2].playedCards = [];
  G.players[1].hand = cartasEspecificasJugador2.map(index => G.cartasTruco[index]);
  G.players[1].playedCards = [];
  G.players[0].hand = cartasEspecificasJugador1.map(index => G.cartasTruco[index]);
  G.players[0].playedCards = [];
  };
  
  function repartirCartas(cartasTruco, numPlayers) {
  const numCartasPorJugador = 3;
  const cartasDadas = new Set();
  const cartasPorJugador = Array.from({ length: numPlayers }, () => []);
  
  for (let jugador = 0; jugador < numPlayers; jugador++) {
  const cartasJugador = cartasPorJugador[jugador];
  while (cartasJugador.length < numCartasPorJugador) {
  let cartaAlAzar;
  do {
  cartaAlAzar = cartasTruco[Math.floor(Math.random() * cartasTruco.length)];
  } while (cartasDadas.has(cartaAlAzar));
  cartasJugador.push(cartaAlAzar);
  cartasDadas.add(cartaAlAzar);
  }
  }
  return cartasPorJugador; // Retorna un array de arrays, donde cada subarray contiene las cartas de cada jugador
  }
  
  //funciones CHECK
  
  function chkCarta(ind0, ind1,cards , numPlayers) {
  let winner;
  let winnerTeam;
  let indexWinner;    
  const cartasArray = cards;
  let indicesJugadoresEquipo0 = ind0;
  let indicesJugadoresEquipo1 = ind1;
  const cartasTeam0 = [];
  const cartasTeam1 = [];
  
  // Sacar integrantes no usados del indice de team (que corresponde a 6 players.)
  if (numPlayers === 2 && indicesJugadoresEquipo0.length > 1) {
    indicesJugadoresEquipo0.splice(-1);
    indicesJugadoresEquipo1.splice(-1);
  } else if (numPlayers === 4 && indicesJugadoresEquipo0.length > 2) {
    indicesJugadoresEquipo0.splice(-1);
    indicesJugadoresEquipo1.splice(-1);
  }
  
  // Iterar sobre los índices del equipo 0
  indicesJugadoresEquipo0.forEach((indice) => {
  cartasTeam0.push(cartasArray[indice]);
  });
  // Iterar sobre los índices del equipo 1
  indicesJugadoresEquipo1.forEach((indice) => {
  cartasTeam1.push(cartasArray[indice]);
  });
  
  
  if (numPlayers === 2) { //2 players
  if (cartasTeam0[0].valorTruco > cartasTeam1[0].valorTruco) {
  winner = cartasTeam0[0];
  winnerTeam = "0";
  indexWinner = "0"
  return [winnerTeam, indexWinner];
  } else if (cartasTeam1[0].valorTruco > cartasTeam0[0].valorTruco) {
  winner = cartasTeam1[0];
  winnerTeam = "1";
  indexWinner = "1";
  return [winnerTeam, indexWinner];
  } else {
  return ["parda", "parda"];
  }
  }
  else { //4 y 6 players
  
  // Función para encontrar el objeto con el valorTruco máximo en un array de cartas
  function encontrarCartaConValorTrucoMaximo(cartas) {
  return cartas.reduce((maximo, carta) => (carta.valorTruco > maximo.valorTruco ? carta : maximo), { valorTruco: -Infinity });
  }
  // Encontrar la carta con el valorTruco máximo en cada equipo
  
  console.log( "cartas maximas antes de funcion: " + cartasTeam0[0].palo + "  .  " + cartasTeam0[0].numero+ " . " );
  console.log( "cartas maximas antes de funcion: " + cartasTeam0[1].palo + "  .  " + cartasTeam0[1].numero+ " . " );
  console.log( "cartas maximas antes de funcion: " + cartasTeam0[2].palo + "  .  " + cartasTeam0[2].numero+ " . " );
  
  console.log( "cartas maximas antes de funcion: " + cartasTeam1[0].palo + "  .  " + cartasTeam1[0].numero+ " . " );
  console.log( "cartas maximas antes de funcion: " + cartasTeam1[1].palo + "  .  " + cartasTeam1[1].numero+ " . " );
  console.log( "cartas maximas antes de funcion: " + cartasTeam1[2].palo + "  .  " + cartasTeam1[2].numero+ " . " );
  
  
  
  let cartaMaximaTeam0 = encontrarCartaConValorTrucoMaximo(cartasTeam0);
  let cartaMaximaTeam1 = encontrarCartaConValorTrucoMaximo(cartasTeam1);
  
  console.log("carta maxima team 0    " + cartaMaximaTeam0.palo + "  " + cartaMaximaTeam0.numero + "." );
  console.log("carta maxima team 1     " + cartaMaximaTeam1.palo + "  " + cartaMaximaTeam1.numero + "." );
  // Función para encontrar el índice de una carta en el array
  function encontrarIndiceDeCartaMaxima(cartaMaxima, array) {
  const indice = array.findIndex(carta => carta === cartaMaxima);
  return indice !== -1 ? indice.toString() : ''; // Convertir a string o devolver un string vacío si no se encuentra
  }
  // Encontrar los índices de las cartas máximas en el array
  let indiceWinnerTeam0 = encontrarIndiceDeCartaMaxima(cartaMaximaTeam0, cartasArray);
  let indiceWinnerTeam1 = encontrarIndiceDeCartaMaxima(cartaMaximaTeam1, cartasArray);
  // Comparar los valores de truco de ambas cartas
  if (cartaMaximaTeam0.valorTruco > cartaMaximaTeam1.valorTruco) {
  // Si el valor de truco de Team0 es mayor
  console.log("*******Gano team 0");
  winnerTeam = "0";
  indexWinner = indiceWinnerTeam0;
  return [winnerTeam, indexWinner];
  } else if (cartaMaximaTeam0.valorTruco < cartaMaximaTeam1.valorTruco) {
  // Si el valor de truco de Team1 es mayor
  console.log("*******Gano Team 1");
  
  winnerTeam = "1";
  indexWinner = indiceWinnerTeam1;
  return [winnerTeam, indexWinner];
  } else {
  // Si los valores de truco son iguales
  console.log("*****Empataron");
  return ["parda", "parda"];
  }
  }
  }
  
  function chkMano(numPlayers, roundCount) {
  let manoIndex;
  if (roundCount === 0) {
  manoIndex = "0";
  } else {
  if (numPlayers === 2) {
  manoIndex = (roundCount % 2).toString(); // Ciclo de índices: '0', '1' (jugadores '0', '1')
  } else if (numPlayers === 4) {
  manoIndex = (roundCount % 4).toString(); // Ciclo de índices: '0', '1', '2', '3' (jugadores '0', '1', '2', '3') 
  } else if (numPlayers === 6) {
  manoIndex = (roundCount % 6).toString(); // Ciclo de índices: '0', '1', '2', '3', '4' (jugadores '0', '1', '2', '3', '4')
  }  
  }
  return manoIndex;
  }
  
  function chkNextMano(numPlayers, roundCount) {
  let manoIndex;
  if (roundCount === 0) {
  manoIndex = "1";
  } else {
  roundCount += 1;
  if (numPlayers === 2) {
  manoIndex = (roundCount % 2).toString(); // Ciclo de índices: '0', '1' (jugadores '0', '1')
  } else if (numPlayers === 4) {
  manoIndex = (roundCount % 4).toString(); // Ciclo de índices: '0', '1', '2', '3' (jugadores '0', '1', '2', '3')
  } else if (numPlayers === 6) {
  manoIndex = (roundCount % 6).toString(); // Ciclo de índices: '0', '1', '2', '3', '4' (jugadores '0', '1', '2', '3', '4')
  }  
  console.log("Es mano:" + manoIndex + ".");
  }
  return manoIndex;
  }
  //FUNCTION chkPie
  //identifica jugadores pie a partir del index del jugador mano, 
  //y los devuelve en un array (pie equipo 0, pie equipo 1)
  
  function chkPie(numPlayers, roundCount, ind0, ind1) {
  let pieIndex;
  if (numPlayers === 2) {
  pieIndex = (roundCount % 2);
  } else if (numPlayers === 4) {
  roundCount += 2;
  pieIndex = (roundCount % 4);
  } else if (numPlayers === 6) {
  roundCount += 4;
  pieIndex = (roundCount % 6);
  }  
  
  console.log("Es mano:" + pieIndex + ".");
  let pieIndex2 = (parseInt(pieIndex) + 1) % numPlayers;
  if (ind0.includes(pieIndex)) {
  console.log("Pie equipo 0 " + pieIndex + ".");
  return [pieIndex, pieIndex2];
  } else if (ind1.includes(pieIndex)) {
  console.log("Pie equipo 0" + pieIndex2 + ".");
  return [pieIndex2, pieIndex];
  } 
  }
  
  //devuelve 1 o 0 segun el team del player que se le pase como arg.
  function chkTeams(ind0, ind1, playerID) {
  
  
    let ind0Array = [];
    let ind1Array = [];
    
    // Recorrer ind0 y almacenar índices en ind0Array
    ind0.forEach(index => {
      ind0Array.push(index);
    });
    
    // Recorrer ind1 y almacenar índices en ind1Array
    ind1.forEach(index => {
      ind1Array.push(index);
    });
  
    console.log(ind1Array);
  
    console.log(ind0Array);
    let PID = Number(playerID);
  console.log(PID);
    if (ind0Array.includes(PID)) {
    return 0;
    } else if (ind1Array.includes(PID)) {
    return 1;
    } else {return 3;}
   }
  
  
  
  
  
  function chkRonda(G, ctx, puntosEquipo0, puntosEquipo1, gano) {
  let nextValue = "0";
  let puntosGralEquipo0 = G.teams[0].ptsGeneral;
  let puntosGralEquipo1 = G.teams[1].ptsGeneral;
  let playedCardsPlayer0 = G.players[0].playedCards;
  let handPlayer0 = G.players[0].hand;
  let playedCardsPlayer1 = G.players[1].playedCards;
  let handPlayer1 = G.players[1].hand;
  let playedCardsPlayer2 = G.players[2].playedCards;
  let handPlayer2 = G.players[2].hand;
  let playedCardsPlayer3 = G.players[3].playedCards;
  let handPlayer3 = G.players[3].hand;
  let playedCardsPlayer4 = G.players[4].playedCards;
  let handPlayer4 = G.players[4].hand;
  let playedCardsPlayer5 = G.players[5].playedCards;
  let handPlayer5 = G.players[5].hand;
  let handCount = G.handCount;
  let cartasTruco = G.cartasTruco;
  let roundCount = G.roundCount;
  let numPlayers = ctx.numPlayers;
  let manoAhora = chkMano(numPlayers, roundCount);
  let manoDespues = chkNextMano(numPlayers, roundCount);
  let rndChk = [];
  
  
  
  if (numPlayers === 2) {
     rndChk = [2, 5];
    } else if (numPlayers === 4) {
    rndChk = [4,  11];
    } else if (numPlayers === 6) {
    rndChk = [6, 16];
    }
  
  
  
  
  
  //si esta 2 a 2 (2-2/2-2)
  if (puntosEquipo0 === 2 && puntosEquipo1 === 2) {
  if (handCount >=  rndChk[1]) {//modificar segun numplayers
  if (manoAhora === 0 ) //cambiar
  {
  puntosGralEquipo0 += 3;
  }else{
  puntosGralEquipo1 += 3;
  }
  roundCount += 1;
  puntosEquipo1 = 0;
  puntosEquipo0 = 0;
  handCount = 0;
  handPlayer0 = [];
  playedCardsPlayer0 = [];
  handPlayer1 = [];
  playedCardsPlayer1 = [];
  handPlayer2 = [];
  playedCardsPlayer2 = [];
  handPlayer3 = [];
  playedCardsPlayer3 = [];
  handPlayer4 = [];
  playedCardsPlayer4 = [];
  handPlayer5 = [];
  playedCardsPlayer5 = [];
  [handPlayer0, handPlayer1, handPlayer2, handPlayer3, handPlayer4, handPlayer5] = repartirCartas(cartasTruco, numPlayers);
  nextValue = manoDespues;
  } 
  
  else {
  console.log('Ambos jugadores tienen 2 puntos en la segunda ronda.');
  puntosEquipo1 = 1;
  puntosEquipo0 = 1;
  nextValue = manoAhora; // El próximo sería el que es mano
  handCount += 1;
  }
  } 
  
  
  //si esta1 a 1 (1-1 / 1-1)
  else if (puntosEquipo0 === 1 && puntosEquipo1 === 1) {
  if (handCount >= rndChk[0]) { //cambiar esto
  nextValue = manoAhora;
  handCount += 1; // Es empate en la primera ronda, sigue el que es mano
  console.log("a ver q pasa");
  } else {
  if (gano === "parda") { 
  nextValue = manoAhora; 
  handCount += 1;// En la segunda ronda, sigue el que ganó
  console.log("gano parda?");
  }else { 
  nextValue = gano; 
  console.log("lo normal");
  handCount += 1;// En la segunda ronda, sigue el que ganó
  }
  }
  } 
  //si solo 1 de los 2 tiene 2 puntos (2-0 / 2-1 / 1-2 /0-2)
  else if (puntosEquipo0 === 2 || puntosEquipo1 === 2) {
  
  if (puntosEquipo0 === 2 && puntosEquipo1 !== 2) {
  puntosGralEquipo0 += 3;
  nextValue = manoDespues; // El próximo sería el que no es mano ahora
  } else if (puntosEquipo0 !== 2 && puntosEquipo1 === 2) {
  puntosGralEquipo1 += 3;
  nextValue = manoDespues; // El próximo sería el que no es mano ahora
  }
  roundCount += 1;
  puntosEquipo1 = 0;
  puntosEquipo0 = 0;
  handCount = 0;
  handPlayer0 = [];
  playedCardsPlayer0 = [];
  handPlayer1 = [];
  playedCardsPlayer1 = [];
  handPlayer2 = [];
  playedCardsPlayer2 = [];
  handPlayer3 = [];
  playedCardsPlayer3 = [];
  handPlayer4 = [];
  playedCardsPlayer4 = [];
  handPlayer5 = [];
  playedCardsPlayer5 = [];
  [handPlayer0, handPlayer1, handPlayer2, handPlayer3,handPlayer4, handPlayer5] = repartirCartas(cartasTruco, numPlayers);
  } 
  
  //si no va 2 a 2, ni 1 a 1 ,  (1-0/ 0-1/ 0-0)
  else {
  console.log("deberia seguir el ke gano, uqe es " +gano);
    nextValue = gano; // Define próximo jugador: el último en ganar
  handCount += 1;
  }
  return {
  next: nextValue,
  puntosGralEquipo0: puntosGralEquipo0,
  puntosGralEquipo1: puntosGralEquipo1,
  puntosEquipo0: puntosEquipo0,
  puntosEquipo1: puntosEquipo1,
  handCount: handCount,
  roundCount: roundCount,
  
  //agregar iteracion
  playedCardsPlayer0: playedCardsPlayer0,
  handPlayer0: handPlayer0,
  playedCardsPlayer1: playedCardsPlayer1,
  handPlayer1: handPlayer1,
  playedCardsPlayer2: playedCardsPlayer2,
  handPlayer2: handPlayer2,
  playedCardsPlayer3: playedCardsPlayer3,
  handPlayer3: handPlayer3,
  playedCardsPlayer4: playedCardsPlayer4,
  handPlayer4: handPlayer4,
  playedCardsPlayer5: playedCardsPlayer5,
  handPlayer5: handPlayer5,
  //
  };
  }
  
  function chkJuego(ptsGeneral1, ptsGeneral2) {
  if (ptsGeneral1 >= 30 || ptsGeneral2 >= 30) {
  console.log("Al menos un jugador tiene 30 puntos o más");
  return true; // Devuelve verdadero si alguien ganó el juego
  } else {
  console.log("Ningún jugador tiene 30 puntos o más");
  return false; // Devuelve falso si nadie ganó el juego todavía
  }
  } 
  
  function chkEnvido(cards) {
  const palos = cards.map(card => card.palo.toLowerCase()); // Convertir los palos a minúsculas
  // Verificar si hay al menos 2 cartas con el mismo palo
  const sameSuit = palos.some((palo, index) => palos.indexOf(palo) !== index);
  // Si no hay al menos 2 cartas con el mismo palo
  if (!sameSuit) {
  // Encontrar la carta con el mayor valorEnvido
  const maxEnvidoCard = cards.reduce((maxCard, card) => (card.valorEnvido > maxCard.valorEnvido ? card : maxCard));
  // Devolver el valorEnvido de la carta con el mayor valorEnvido
  return maxEnvidoCard.valorEnvido;
  }
  // Filtrar las cartas con el palo más común (considerando minúsculas)
  const paloComun = palos.reduce((acc, palo) => (acc[palo] = (acc[palo] || 0) + 1, acc), {});
  const paloMasComun = Object.keys(paloComun).reduce((a, b) => paloComun[a] > paloComun[b] ? a : b);
  const cartasPaloComun = cards.filter(card => card.palo.toLowerCase() === paloMasComun);
  // Ordenar las cartas con el mismo palo por valorEnvido en orden descendente
  const sortedByEnvido = cartasPaloComun.sort((a, b) => b.valorEnvido - a.valorEnvido);
  // Sumar los dos valores de envido más altos y agregarles 20
  let envidoSum = 0;
  if (sortedByEnvido.length >= 2) {
  envidoSum = sortedByEnvido.slice(0, 2).reduce((sum, card) => sum + card.valorEnvido, 0) + 20;
  } else {
  envidoSum = sortedByEnvido[0].valorEnvido;
  }
  return envidoSum;
  }
  
  
  
  
  function ordenTurnos(numPlayers) {
    let ordenTurnos = [];
  
    if (numPlayers === 2) {
      ordenTurnos = ["0", "1"];
    } else if (numPlayers === 4) {
      ordenTurnos = ["0", "1", "2", "3"];
    } else if (numPlayers === 6) {
      ordenTurnos = ["0", "1", "2", "3", "4", "5"];
    }
  
    return ordenTurnos;
  }
  
  
  
  
  const funciones = {
    quiero,
    noQuiero,
    alMazo,
    cantaTruco2,
    cantaTruco,
    cantaRetruco,
    cantaReal,
    cantaVale4,
    cantaEnvido,
    cantaEnvidoEnvido,
    cantaEnvidoReal,
    cantaEnvidoFalta,
    cantaFalta,
    cantaRealFalta,
    cantaEnvidoEnvidoReal,
    cantaEnvidoRealFalta,
    cantaEnvidoEnvidoRealFalta,
    cantaFlor,
    cantaContraFlor,
    cantaContraFlorResto,
    cantaConFlorAchico,
    jugarCarta,
    jugarCartaNEnd,
    darCartasInicial,
    darCartas,
    darCartasDebug,
    repartirCartas,
    chkCarta,
    chkMano,
    chkNextMano,
    chkPie,
    chkTeams,
    chkRonda,
  };
  
  export default funciones;