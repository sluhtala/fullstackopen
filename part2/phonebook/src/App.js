import React, { useState, useEffect } from "react";
import axios from "axios";

const Number = (props) => {
	const { person, pattern } = props;
	if (!pattern.test(person.name)) return "";
	return (
		<p>
			{person.name} {person.number}
		</p>
	);
};

const Numbers = (props) => {
	const { persons, filter } = props;
	const pattern = RegExp("(^.* |^)" + filter, "i");
	if (persons.lenght === 0) {
		console.log("Initial list empty");
		return "";
	}
	return (
		<>
			{persons.map((person, i) => {
				return (
					<Number pattern={pattern} key={person.id} person={person} />
				);
			})}
		</>
	);
};

const Form = (props) => {
	//console.log(props);
	const {
		handleSubmit,
		setNewName,
		setNewNumber,
		newName,
		newNumber,
	} = props;
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={(e) => setNewNumber(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	);
};

const Filter = (props) => {
	const { filter, setFilter } = props;
	return (
		<>
			<div>filter shown with </div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					value={filter}
					onChange={(e) => {
						setFilter(e.target.value);
					}}
				></input>
			</form>
		</>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const getDataHook = () => {
		axios
			.get("http://localhost:3001/persons")
			.then((res) => {
				//console.log(res);
				setPersons(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useEffect(getDataHook, []);
	const findMaxId = () => {
		let biggest = 0;
		persons.forEach((person) => {
			if (person.id > biggest) biggest = person.id;
		});
		return biggest;
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!newNumber || !newName) {
			console.log("Fill both fields");
			return;
		}
		if (!/[0-9\s+-]+/.test(newNumber)) {
			console.log("Not a valid number");
			return;
		}
		const checkName = persons.find((person) => {
			return person.name === newName;
		});
		if (checkName) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		const newPerson = {
			name: newName,
			number: newNumber,
			id: findMaxId() + 1,
		};
		const newArray = [...persons];
		newArray.push(newPerson);
		setPersons(newArray);
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				filter={filter}
				setFilter={(arg) => {
					setFilter(arg);
				}}
			/>
			<h3>Add a new</h3>
			<Form
				setNewNumber={(arg) => setNewNumber(arg)}
				setNewName={(arg) => setNewName(arg)}
				newName={newName}
				newNumber={newNumber}
				handleSubmit={(e) => handleSubmit(e)}
			/>
			<h3>Numbers</h3>
			<Numbers persons={persons} filter={filter} />
		</div>
	);
};

export default App;
