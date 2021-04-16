import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [useError, setUseError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event)=>{
    event.preventDefault();
    console.log('logging in...');
    try{
      const userReturned = await loginService.login({username: username, password: password });
      setUser(userReturned);
      sessionStorage.setItem('user-logged', JSON.stringify(userReturned));
      setUsername('');
      setPassword('');
    }
    catch (e){
      setNotification('Wrong username or password');
      setUseError(true);
      setTimeout(()=>{
        setNotification(null);
        setUseError(false);
      },5000)
    }
  }


  useEffect(()=>{
    const sessionUser = sessionStorage.getItem('user-logged');
    if (sessionUser)
    {
      console.log('sessionuser found');
      const userRemembered = JSON.parse(sessionUser);
      setUser(userRemembered);
    }
  },[]);

  return (
    <div>
      <Notification message={notification} error={useError}/>
      <Blogs
      user={user}
      setUser={(arg)=>{setUser(arg)}}
      setNotification={(arg)=>setNotification(arg)}
      setError={(arg)=>setUseError(arg)}
      />
      <LoginForm 
      user={user}
      submit={(e)=>handleLogin(e)}
      username={username}
      password={password}
      setPassword={(a)=>setPassword(a)}
      setUsername={(a)=>setUsername(a)}
      />
    </div>
  )
}

export default App