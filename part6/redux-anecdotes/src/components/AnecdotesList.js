import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
/*
  const setVoteNotification = (content)=>{
    const text = `You voted '${content}'`;
    dispatch(showNotification(text));
    setTimeout(()=>{
      dispatch(hideNotification());
    },5000)
  }
  */

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdote(anecdote))
    //setVoteNotification(anecdote.content);
    dispatch(setNotification(`You voted ${anecdote.content}`, 5000));
  }

  const filterAnecdotes = () =>{
    console.log(anecdotes);
    if (anecdotes.length === 0)
      return [];
    return (anecdotes.filter((anecdote)=>anecdote.content.toLowerCase().includes(filter)));
  }

  return (
    <div>
      {
      filterAnecdotes().sort((a, b)=>b.votes-a.votes).map(anecdote =>
        <div key = {anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;