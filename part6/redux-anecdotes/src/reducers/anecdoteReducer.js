import { getByDisplayValue } from '@testing-library/dom'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const initialState = [];


const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type){
    case 'NEW':
      return [...state, action.data];
    case 'VOTE':
      const id = action.data;
      const anecdote = state.find((a)=>a.id === id);
      anecdote.votes++;
      return [...state];
    case 'INITIALIZE':
      return action.data;
    default:
      return state;
  }
}

export const newAnecdote = (content) => {
  return (async(dispatch)=>{
    const newAnec = await anecdoteService.createNew(content);
    dispatch(
      {
        type: 'NEW',
        data: newAnec
      }
    )
  }
  );
};

export const voteAnecdote = (anecdote) => {
  return (async(dispatch)=>{
    const anecCpy = {...anecdote};
    anecCpy.votes += 1;
    const response = await anecdoteService.updatedAnecdote(anecCpy);
    dispatch(
      {
        type: 'VOTE',
        data: response.id
      }
    );
    }
  );
}

export const initializeAnecdotes = () => {
  return (async(dispatch)=>{
    const anecdotes = await anecdoteService.getAll();
    dispatch(
      {
        type: 'INITIALIZE',
        data: anecdotes
      }
    );
  })
}


export default anecdoteReducer