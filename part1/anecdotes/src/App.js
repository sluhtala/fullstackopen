import React, { useState } from "react";

const Button = ({ text, action }) => {
	return <button onClick={action}>{text}</button>;
};

const MostVotes = ({ anecdotes, scores }) => {
	let indexOfMostVotes = 0;
	for (let i = 0; i < scores.length; i++) {
		if (scores[i] > scores[indexOfMostVotes]) indexOfMostVotes = i;
	}
	return <p>{anecdotes[indexOfMostVotes]}</p>;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
	];

	const [selected, setSelected] = useState(0);
	const [scores, setScores] = useState(Array(anecdotes.length).fill(0));

	const nextAnecdote = (current) => {
		if (anecdotes.length <= 1) return;
		let rand = current;
		while (rand === current) {
			rand = Math.floor(Math.random() * anecdotes.length);
			//console.log(rand);
		}
		setSelected(rand);
	};

	const voteSelected = () => {
		const newScores = [...scores];
		newScores[selected] += 1;
		setScores(newScores);
	};

	return (
		<>
			<h1>Anecdote of the day</h1>
			<p>"{anecdotes[selected]}"</p>
			<p>Has {scores[selected]} votes</p>
			<Button text="vote" action={() => voteSelected()} />
			<Button
				text="next anecdote"
				action={() => {
					nextAnecdote(selected);
				}}
			/>
			<h1>Anecdote with most votes</h1>
			<MostVotes scores={scores} anecdotes={anecdotes} />
		</>
	);
};

export default App;
