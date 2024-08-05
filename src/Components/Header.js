import React from 'react';

import { 
    GAME_STATE_PLAY, 
    GAME_STATE_WIN,
} from "../Constants";

const Header = ({ gameState, currentPlayer, winPlayer }) => {
  const renderLabel = () => {
    switch(gameState) {
        case GAME_STATE_PLAY:
            return `Player ${ currentPlayer } Turn`
        case GAME_STATE_WIN:
            return `Player ${ winPlayer } Wins!`
        default:
            return ``
    }
  }

  return (
    <div className="panel header">
        <div className="header-text">
            { renderLabel() }
        </div>
    </div>
  );
}

export default Header;
