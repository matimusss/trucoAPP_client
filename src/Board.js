import React, { useState, useEffect } from 'react';
import { animate } from "motion"
export function TrucoBoard({ ctx, G, moves, playerID }) {

  const elemento = document.querySelector("#imagen");




// Componente TrucoBoard
  const currentPlayer = G.players[playerID];
  const otherID = playerID === "0" ? "1" : "0";
  const otherPlayer = G.players[otherID];
  const numRonda = G.roundCount;
  const numHand = G.handCount;

function onClickCard(index, cartita) {
  let selector = "#"+cartita;
  let carta = document.querySelector(selector);
  // Verificar si el usuario está en RTA o no está activo
  if (ctx.currentPlayer !== playerID || (ctx.activePlayers[playerID] && ctx.activePlayers[playerID].includes("rta"))) {
    // Usuario en RTA o no activo.
    // No hacer nada, no puede hacer nada al clickear la carta
  } else {
    // Está activo y no está en RTA
    // Si es una carta que se puede jugar
    // Animación y luego ejecutar movimiento
    animate(
      carta,
      { y: 500, rotate: 4.5, opacity: 0 },
      { duration: 1.5 }
    );
    setTimeout(() =>  moves.jugarCarta(index), 500);
}}



// Componente RenderCartas para mostrar las cartas de un jugador
const RenderCartas = ({ currentPlayer }) => {
  if (!currentPlayer || !currentPlayer.hand || currentPlayer.hand.length === 0) {
    return <div>No hay cartas...</div>;
  }
  return (
    <div>
      {currentPlayer.hand.map((carta, index) => (
        <img
          id={carta.palo+carta.numero}
          key={index}
          src={`/img/${carta.palo}/${carta.numero}.jpg`}
          alt={`${carta.numero} de ${carta.palo}`}
          style={{ width: '100px', height: '150px', marginRight: '10px' }}
          onClick={() => onClickCard(index, carta.palo+carta.numero)}
        />
      ))}
    </div>
  );
};

// Componente RenderCartas para mostrar las cartas de un jugador
const RenderCartasJugadas = ({ currentPlayer }) => {
  if (!currentPlayer || !currentPlayer.playedCards || currentPlayer.playedCards.length === 0) {
    return <div>No hay cartas...</div>;
  } else {

//let ultElem = currentPlayer.playedCards[currentPlayer.playedCards.length - 1];
//function choto() {
//  let cartita= ultElem.palo+ultElem.numero;
//console.log(cartita);
//let selector = "#"+cartita;
//let carta = document.querySelector(selector);
//animate(carta,{ y: 500, rotate: 4.5, opacity: 100 },{ duration: 1.5 })
//};
//setTimeout(() =>  choto(), 2500);

}
 


  return (


    <div>
      {currentPlayer.playedCards.map((carta, index) => (
        <img
        id={carta.palo+carta.numero}
          key={index}
          src={`/img/${carta.palo}/${carta.numero}.jpg`}
          alt={`${carta.numero} de ${carta.palo}`}
          style={{ width: '50px', height: '75px', marginRight: '10px', opacity: '0'  }}
        />
      ))}
    </div>
  );
};




  return (
   <div>
   <h2>Jugador {playerID}</h2>
      <RenderCartas currentPlayer={currentPlayer} />
      <h3>Cartas jugadas por vos:</h3>
      <RenderCartasJugadas currentPlayer={currentPlayer} />
    </div>
  );
};

   