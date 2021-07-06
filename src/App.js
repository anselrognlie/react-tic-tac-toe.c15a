import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const handleSquareClicked = id => {
    if (winner) { return; }

    setSquares(updateSquares(id));
  };

  const updateSquares = (id) => {
    const newSquares = [...squares];
    for (const row of newSquares) {
      for (const square of row) {
        if (square.id === id && square.value === '') {
          square.value = player;
          switchPlayer();
          return newSquares;
        }
      }
    }

    return newSquares;
  };

  const switchPlayer = () => {
    if (player === PLAYER_1) {
      setPlayer(PLAYER_2);
    } else {
      setPlayer(PLAYER_1);
    }
  };

  const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go across each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.
    if (winner) { return; }

    const winningMoves = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const moves of winningMoves) {
      const [row, col] = moves[0];
      const player = squares[row][col].value;
      if (player === '') { continue; }

      let winner = true;
      for (const move of moves) {
        const [row, col] = move;
        if (player !== squares[row][col].value) {
          winner = false;
          break;
        }
      }

      if (winner) {
        setWinner(player);
        return;
      }
    }
  }

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setPlayer(PLAYER_1);
    setWinner(null);
  }

  checkForWinner();

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        { winner && <h2>Winner is {winner}</h2>}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={handleSquareClicked} />
      </main>
    </div>
  );
}

export default App;
