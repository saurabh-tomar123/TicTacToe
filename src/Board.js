import React, { useState } from 'react';

const Board = () => {
  const [squares, setSquares] = useState(Array(64).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const players = ['X', 'O', 'A', 'B'];
  const playerColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = players[currentPlayer - 1];
    setSquares(newSquares);
    setCurrentPlayer((currentPlayer % 4) + 1);
  };

  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
      className={squares[i] ? playerColors[players.indexOf(squares[i])] : 'bg-gray-200'}
    />
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: Player ${players.indexOf(winner) + 1} (${winner})`;
  } else {
    status = `Next player: Player ${currentPlayer} (${players[currentPlayer - 1]})`;
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl mb-4">{status}</div>
      <div className="grid grid-cols-8 gap-1">
        {Array(64).fill(null).map((_, i) => renderSquare(i))}
      </div>
    </div>
  );
};

const Square = ({ value, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-16 h-16 flex items-center justify-center text-2xl font-bold ${className}`}
  >
    {value}
  </button>
);

const calculateWinner = (squares) => {
  const lines = [
    // Horizontal lines
    ...Array(8).fill(null).map((_, row) => Array(4).fill(null).map((_, col) => [row * 8 + col, row * 8 + col + 1, row * 8 + col + 2, row * 8 + col + 3, row * 8 + col + 4])),
    // Vertical lines
    ...Array(8).fill(null).map((_, col) => Array(4).fill(null).map((_, row) => [row * 8 + col, (row + 1) * 8 + col, (row + 2) * 8 + col, (row + 3) * 8 + col, (row + 4) * 8 + col])),
    // Diagonal lines
    ...Array(4).fill(null).map((_, row) => Array(4).fill(null).map((_, col) => [row * 8 + col, (row + 1) * 8 + col + 1, (row + 2) * 8 + col + 2, (row + 3) * 8 + col + 3, (row + 4) * 8 + col + 4])),
    ...Array(4).fill(null).map((_, row) => Array(4).fill(null).map((_, col) => [(row + 4) * 8 + col, (row + 3) * 8 + col + 1, (row + 2) * 8 + col + 2, (row + 1) * 8 + col + 3, row * 8 + col + 4])),
  ].flat();

  for (let line of lines) {
    const [a, b, c, d, e] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
