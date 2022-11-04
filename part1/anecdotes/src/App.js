import { useState } from "react";

const App = () => {
  const anecdotes = [
    "Good code is its own best documentation",
    "Adding manpower is a late software project makes it later!",
    "The best way to get a project done faster is to start sooner",
    "How does a project get to be a year late?... One day at a time",
    "Plan to throw one (implementation) away; you will, anyhow",
    "A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want",
    "Before software can be reusable it first has to be usable",
    "Better train people and risk they leave--than to do nothing and risk they stay!",
    "Simple things should be simple, complex things should be possible",
    "Simplicity is the prerequisite for reliablity",
    "Plans are useless but planning is indispensible",
    "If something is worth doing once, it's worth building a tool to do it",
    "When debugging, novices insert corrective code, experts remove defective code",
    "Every big computing disaster has come from taking too many ideas and putting them in one place",
    "No matter what the problem is, it's always a people problem",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  // Generate random number, max inclusive
  const randomNum = (max) => Math.floor(Math.random() * max);

  const findMax = () => {
    const max = votes.reduce((a, b) => Math.max(a, b), -Infinity);
    const position = votes.indexOf(max);
    setMostVoted(position);
  };

  const handleNext = () => {
    setSelected(randomNum(anecdotes.length))
    findMax();
  };

  const handleVote = () => {
    const newVote = votes.map((vote, index) => {
      if (index === selected) {
        return vote + 1;
      }
      return vote;
    });
    setVotes(newVote);
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>{`has ${votes[selected]} votes`}</p>
      </div>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVoted]}</p>
        <p>{`has ${votes[mostVoted]} votes`}</p>
      </div>
    </div>
  );
};

export default App;
