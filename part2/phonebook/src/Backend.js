import axios from "axios";
const url = "http://localhost:3001/persons";

const addNumber = (person) => {
	axios
		.post(url, person)
		.then((result) => {
			console.log(result);
			console.log("new number added");
		})
		.catch((e) => {
			console.log(e);
		});
};

const deleteNumber = (person) => {
	axios.delete(`${url}/${person.id}`).then((result) => {
		console.log(result);
	});
};

const updateNumber = (person) => {
	axios.put(`${url}/${person.id}`, person).then((result) => {
		console.log(result);
		console.log(person.name + "'s number updated");
	});
};

export default { addNumber, deleteNumber, updateNumber };
