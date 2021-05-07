import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import queries from '../queries'

const Login = ({ show, setToken, setPage, setError })=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(queries.LOGIN,{
    onError: (error)=>{setError(error.message)},
    refetchQueries: [{query: queries.ME}]
  })

  useEffect(()=>{
    if (result.data)
    {
      setToken(result.data.login.value)
      localStorage.setItem('token', result.data.login.value);
      setPage("authors");
    }
  },[result.data]) //eslint-disable-line

  const submit = (event) =>{
    event.preventDefault();
    login({variables: {username, password}})

    setUsername('');
    setPassword('');
  }

  if (!show)
    return null;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username: 
          <input value={username} onChange={({target})=>setUsername(target.value)}/>
        </div>
        <div>
          password: 
          <input value={password} onChange={({target})=>setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login;


