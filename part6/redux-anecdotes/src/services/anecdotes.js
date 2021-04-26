import { getByTestId } from '@testing-library/dom';
import axios from 'axios'
const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async() => {
  const response = await axios.get(baseURL)
  return response.data;
}

const getId = ()=>{
  return Math.floor(Math.random() * 100000000).toString();
}

const createNew = async(content) => {
  const object = {content: content, id: getId(), votes: 0};
  const response = await axios.post(baseURL, object);
  return response.data;
}

const updatedAnecdote = async(object)=>{
  const response = await axios.put(`${baseURL}/${object.id}`, object)
  return response.data;
}

const anecdoteService = {
  getAll,
  createNew,
  updatedAnecdote
}
export default anecdoteService;