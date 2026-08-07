import { useState } from "react";
import { channelFilter, fisherYatesShuffle } from "./Cards";
import "./App.css";
import { useEffect } from "react";
function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <Header currentScore={currentScore} bestScore={bestScore}></Header>
      <CardList
        currentScore={currentScore}
        bestScore={bestScore}
        setCurrentScore={setCurrentScore}
        setBestScore={setBestScore}
      />
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
function Card({ name, photo, handleClick }) {
  return (
    <div className="card" onClick={handleClick}>
      <img src={photo} alt={name + "'s photo"} />
      <p className="name">{name}</p>
    </div>
  );
}
function CardList({ currentScore, bestScore, setCurrentScore, setBestScore }) {
  const [selected, setSelected] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState(true);
  useEffect(() => {
    fetch(
      "https://holodex.net/api/v2/channels?org=Hololive&type=vtuber&limit=100",
      { headers: { "X-APIKEY": import.meta.env.VITE_HOLODEX_API_KEY } },
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredData = channelFilter(data);
        setCards(fisherYatesShuffle(filteredData).slice(0, 12));
        setLoading(false);
      });
  }, [newGame]);

  if (loading) return <p>Loading...</p>;
  function handleCardClick(id) {
    if (!selected.includes(id)) {
      const newSelected = [...selected, id];
      if (newSelected.length === cards.length) {
        alert("You win!");
        setSelected([]);
        setNewGame(!newGame);
      } else setSelected(newSelected);
      const score = currentScore + 1;
      if (score > bestScore) setBestScore(score);
      setCurrentScore(score);
      setCards(fisherYatesShuffle(cards));
    } else {
      setCurrentScore(0);
      setSelected([]);
      setNewGame(!newGame);
    }
  }
  const listItems = cards.map((card) => (
    <Card
      name={card.english_name}
      photo={card.photo}
      handleClick={() => handleCardClick(card.id)}
      key={card.id}
    />
  ));

  return <div className="card-list">{listItems}</div>;
}
export default App;
