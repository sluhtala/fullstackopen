import React from "react";

const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = (props) => {
	console.log(props);
	const [part1, part2, part3] = props.parts;
	return (
		<>
			<p>
				{part1.name} {part1.exercises}
			</p>
			<p>
				{part2.name} {part2.exercises}
			</p>
			<p>
				{part3.name} {part3.exercises}
			</p>
		</>
	);
};

const Total = (props) => {
	const [part1, part2, part3] = props.parts;
	return (
		<p>
			Number of exercises{" "}
			{part1.exercises + part2.exercises + part3.exercises}
		</p>
	);
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
