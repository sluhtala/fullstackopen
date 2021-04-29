import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import { timeNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux';

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [useError, setUseError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in...');
    try{
      const userReturned = await loginService.login({ username: username, password: password });
      setUser(userReturned);
      sessionStorage.setItem('user-logged', JSON.stringify(userReturned));
      setUsername('');
      setPassword('');
    }
    catch (e){
      handleNotification('Wrong username or password', 5000, true);
    }
  }

  const handleNotification = (text, time, error) => {
    dispatch(timeNotification(text, time, error));
  }


  useEffect(() => {
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
        user = {user}
        setUser = {(arg) => {setUser(arg)}}
        setNotification = {(arg) => setNotification(arg)}
        handleNotification = {handleNotification}
        setError = {(arg) => setUseError(arg)}
      />
      <LoginForm
        user={user}
        submit={(e) => handleLogin(e)}
        username={username}
        password={password}
        setPassword={(a) => setPassword(a)}
        setUsername={(a) => setUsername(a)}
      />
    </div>
  )
}

export default App