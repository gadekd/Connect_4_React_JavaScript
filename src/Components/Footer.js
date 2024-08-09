import React from 'react'

import { 
  GAME_STATE_PLAY
} from "../Constants";

const Footer = ({ onNewGameClick, onSuggestClick, gameState }) => {
  const renderButton = () => {
    if (gameState === GAME_STATE_PLAY) {
      return <button onClick={onSuggestClick}>Suggest</button>
    }
    return <button onClick={onNewGameClick}>New Game</button>
  }

  return (
    <div className="panel footer">
      {
        renderButton()
      }
    </div>
  );
}

export default Footer;
