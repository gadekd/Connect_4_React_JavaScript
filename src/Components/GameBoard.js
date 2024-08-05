import React, {useEffect, useState} from "react";

import "../Game.css";

import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";

import { isWinner, isDraw } from './helper';

import { 
    GAME_STATE_PLAY, 
    GAME_STATE_WIN,
    NO_PLAYER, 
    PLAYER_1, 
    PLAYER_2,
    NB_OF_CIRCLES, 
    GAME_STATE_DRAW
} from "../Constants";

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAY);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    useEffect(() => {
        initGame();
    }, []);
    
    const initGame = () => {
        console.log("Game initialized");
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
    }

    const initBoard = () => {
        // setCurrentPlayer(PLAYER_1);
        // setGameBoard(Array(16).fill(NO_PLAYER));

        const circles = [];

        for (let i = 0; i < NB_OF_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;

    }

    const circleClicked = (id) => {
        console.log("Circle clicked!: " + id);

        // Player cannot click on already clicked circle
        if (gameBoard[id] !== NO_PLAYER) return;

        // Game should stop and circles are not clickable
        // if the winner is announced
        if (gameState !== GAME_STATE_PLAY) return;

        if (isWinner(gameBoard, id, currentPlayer)) {
            console.log("Winner!");
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if (isDraw(gameBoard, id, currentPlayer)) {
            console.log("DRAW!");
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

        console.log(gameBoard);
        console.log(currentPlayer);
    }

    const renderCircle = id => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />
    }

return (
    <>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
        <div className="gameBoard">
            {initBoard()}
        </div>
        <Footer onClickEvent={initGame} />
    </>
    )
}

export default GameBoard;