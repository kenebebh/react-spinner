import { useState, useEffect } from "react";
import "./App.css";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setJoke(data);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <HashLoader
          loading={loading}
          color="#202020"
          aria-label="Loading Spinner"
        />
      ) : (
        <div>
          <div className="joke__container">{joke.setup}</div>
          <button
            className="showAnswerButton"
            onClick={() => {
              setShowAnswer(!showAnswer);
            }}
          >
            Click to see answer
          </button>
          <div>{showAnswer && joke.punchline}</div>

          <div className="newJokeButton">
            <button
              onClick={() => {
                fetchJoke();
                setShowAnswer(false);
              }}
            >
              New Joke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
