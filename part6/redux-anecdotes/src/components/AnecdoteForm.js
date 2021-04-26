import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch, connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecodteForm = (props) => {
  //const dispatch = useDispatch();

  /*
  const setNotification = (content) => {
    const text = `You created '${content}'`;
    dispatch(showNotification(text));
    setTimeout(()=>{
      dispatch(hideNotification());
    },5000)
  }
  */

  const createNew = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    props.newAnecdote(content)
    event.target.content.value = '';
    //setNotification(content);
    console.log(props);
    props.setNotification(`You created ${content}`, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  setNotification,
  newAnecdote
}

export default connect(null ,mapDispatchToProps)(AnecodteForm);