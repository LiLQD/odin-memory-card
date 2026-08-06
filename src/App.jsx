import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <Header currentScore={currentScore} bestScore={bestScore}></Header>
    </>
  );
}

function Header({ currentScore, bestScore }) {
  return (
    <div className="header">
      <div className="game-rule">
        <h1>Memory Card Game</h1>
        <h3>
          Get points by clicking on an image but DON'T click on any more than
          once!
        </h3>
      </div>
      <div className="score">
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </div>
  );
}
export default App;
