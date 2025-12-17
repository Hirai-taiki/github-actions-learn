import { useState } from "react";
import "./App.css";

// マスの状態型
type Player = "X" | "O" | null;

export default function App() {
  // 3x3 = 9マスの盤面
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (index: number) => {
    // すでに埋まっている or 勝敗決定後は無視
    if (board[index] || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? "X" : "O";

    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="container">
      <h1 className="title">三目ならべ</h1>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="cell"
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="status">
        {winner
          ? `勝者: ${winner}`
          : board.every(Boolean)
            ? "引き分け"
            : `次の手番: ${isXNext ? "X" : "O"}`}
      </div>

      <button className="reset" onClick={resetGame}>
        リセット
      </button>
    </div>
  );
}

function calculateWinner(board: Player[]): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
