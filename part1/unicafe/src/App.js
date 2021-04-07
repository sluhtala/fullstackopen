import React, { useState } from "react";

const Button = ({ text, action }) => {
	return <button onClick={action}>{text}</button>;
};

const Statistic = (props) => {
	//console.log(props);
	const { text, value } = props;
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const avarage = all === 0 ? 0 : (good - bad) / all;
	const positive = all === 0 ? 0 : (good * 100) / all;

	if (all === 0) return <p>No feedback given</p>;
	return (
		<table>
			<tbody>
				<Statistic text={"good"} value={good} />
				<Statistic text={"neutral"} value={neutral} />
				<Statistic text={"bad"} value={bad} />
				<Statistic text={"all"} value={all} />
				<Statistic text={"avarage"} value={avarage} />
				<Statistic text={"positive"} value={positive} />
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" action={() => setGood(good + 1)} />
			<Button text="neutral" action={() => setNeutral(neutral + 1)} />
			<Button text="bad" action={() => setBad(bad + 1)} />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
