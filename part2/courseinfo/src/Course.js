const Part = (props) => {
	const { name, exercises } = props.part;
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

const Content = (props) => {
	//console.log(props);
	const { parts } = props;
	return (
		<>
			{parts.map((part) => (
				<Part part={part} key={part.id} />
			))}
		</>
	);
};

const Total = (props) => {
	const { parts } = props;
	const reducer = (prev, current) => prev + current;
	const exercisesArray = parts.map((p) => p.exercises);
	const total = exercisesArray.reduce(reducer);
	return <b>total of {total} exercises</b>;
};

const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Course = (props) => {
	const { course } = props;
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

export default Course;
