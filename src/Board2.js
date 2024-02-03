import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'motion';
import './style.css'; // Importa el archivo CSS

export function TrucoBoard2({ G }) {
  const [anguloX, setAnguloX] = useState(0);
  const [anguloY, setAnguloY] = useState(0);
  const [prevPlayedCards, setPrevPlayedCards] = useState(G.players);
  const tableroRef = useRef(null);







  function cambiarAnguloY(event) {
    const nuevoAnguloY = parseInt(event.target.value, 10);
    setAnguloY(nuevoAnguloY);
  }



  function cambiarAnguloX(event) {
    const nuevoAnguloX = parseInt(event.target.value, 10);
    setAnguloX(nuevoAnguloX);
  }


  function isEqual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }

  function procesarJugador(x) {
    const jugador = G.players[x];

    if (!isEqual(jugador.playedCards, prevPlayedCards[x].playedCards)) {
      console.log(`Se ejecutó porque playedCards del jugador ${x + 1} cambió.`);
      setPrevPlayedCards(G.players);
      if (jugador.playedCards.length > 0) {
        const ultimaCarta = jugador.playedCards[jugador.playedCards.length - 1];
        const cartaId = ultimaCarta.palo + ultimaCarta.numero;
        console.log("USEEFFET");
        console.log(cartaId);
        setTimeout(function () {
          const cartaElement = document.getElementById(cartaId);
          animate(
            cartaElement,
            { x: [-100, 0, 100, 0], rotateY: [0, 100, 50, 0], opacity: [0, 0.5, 0.75, 1], scale: [0, 0.25, 0.5, 1] },
            { duration: 3 }
          );
        }, 2);
      }
    }
  }

  useEffect(() => {
    procesarJugador(0);
    procesarJugador(1);
    procesarJugador(2);
    procesarJugador(3);
    procesarJugador(4);
    procesarJugador(5);
  }, [G.players]);

  useEffect(() => {
    const tablero = tableroRef.current;
    if (tablero) {
      const porcentajeX = anguloX ; // Convertir el ángulo a porcentaje
      const porcentajeY = anguloY ; // Convertir el ángulo a porcentaje
      tablero.style.transform = `rotateX(${anguloX}deg) rotateY(${anguloY}deg)`;
    }
  }, [anguloX, anguloY]);



  const PlayerCards = ({ cards }) => {
    return (
      <>
        {cards.map((carta, index) => (
          <img
            key={carta.palo + carta.numero}
            id={carta.palo + carta.numero}
            src={`/img/${carta.palo}/${carta.numero}.jpg`}
            alt={`${carta.numero} de ${carta.palo}`}
            className='cardImg'
          />
        ))}
      </>
    );
  };

  return (
    <div className="container">
      <div className="menuSuperior">
        <input
          type="range"
          id="rangeInputX"
          min="-360"
          max="360"
          value={anguloX}
          step="1"
          onChange={cambiarAnguloX}
        />
          <input
          type="range"
          id="rangeInputX"
          min="-360"
          max="360"
          value={anguloY}
          step="1"
          onChange={cambiarAnguloY}
        />
      </div>


      <div className="tablero" ref={tableroRef}>
       
      <div  id="avatar1" className="inner-div avatar">
        <div className="avatarContainer">
    <div className="avatarRow"><img src="/img/avatar.png" className='avatarimg' /></div>
    <div className="avatarRow">Monica</div>
    </div>
      
        </div>

        <div id="playedCards1" className="inner-div played-cards">
        <PlayerCards cards={G.players[0].playedCards} />
        </div>
        
  
    

        
        <div className="flex-row">
            <div className="inner-div avatar">
            <div className="avatarContainer">
    <div className="avatarRow"><img src="/img/avatar.png" className='avatarimg' /></div>
    <div className="avatarRow">Monica</div>
    </div>
            </div>
            <div className="inner-div played-cards">
            <PlayerCards cards={G.players[1].playedCards} />
            </div>
            <div className="inner-div played-cards">
            <PlayerCards cards={G.players[2].playedCards} />
            </div>
            <div className="inner-div avatar">
            <div className="avatarContainer">
    <div className="avatarRow"><img src="/img/avatar.png" className='avatarimg' /></div>
    <div className="avatarRow">Monica</div>
    </div>
            </div>
            </div>



          
      
      
        
           
        


            <div className="flex-row">
            <div className="inner-div avatar">
            <div className="avatarContainer">
    <div className="avatarRow"><img src="/img/avatar.png" className='avatarimg' /></div>
    <div className="avatarRow">Monica</div>
    </div>
            </div>
            <div className="inner-div played-cards">
            <PlayerCards cards={G.players[3].playedCards} />
            </div>
            <div className="inner-div played-cards">
            <PlayerCards cards={G.players[4].playedCards} />
            </div>
            <div id="avatar2"className="inner-div avatar">
            <div className="avatarContainer">
    <div className="avatarRow"><img src="/img/avatar.png" className='avatarimg' /></div>
    <div className="avatarRow">Monica</div>
    </div>
            </div>
            </div>





     
        
        <div className="inner-div played-cards">
        <PlayerCards cards={G.players[5].playedCards} />
        </div>
      </div>

      <div className="menuInferior">Menú Inferior</div>
    </div>
  );
}

export default TrucoBoard2;
