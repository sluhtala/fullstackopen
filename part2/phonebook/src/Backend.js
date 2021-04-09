import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const backEnd = {
	addNumber: (person) => {
		const request = axios.post(baseURL, person);
		return request.then((respond) => respond.data);
	},

	deleteNumber: (person) => {
		const request = axios.delete(`${baseURL}/${person.id}`);
		return request.then((respond) => respond.data);
	},

	updateNumber: (person) => {
		const request = axios.put(`${baseURL}/${person.id}`, person);
		return request.then((respond) => respond.data);
	},
};

export default backEnd;
