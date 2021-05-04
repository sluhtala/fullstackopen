import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import { timeNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './reducers/loggedUserReducer';
import LoggedStatus from './components/LoggedStatus'
import Users from './components/Users'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import { Typography, Link as MLink, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const Navbar = ()=>{
  const user = useSelector(state=>state.loggedIn);
  const buttonStyle={
    padding: "30px",
    minWidth: "100px"
  }
  if (!user)
    return null;
  return (
    <div style = {{display: 'inline-block'}}>
      <Link to='/users'><MLink style={buttonStyle} component='button' variant='inherit'>Users</MLink></Link>
      <Link to='/'><MLink style={buttonStyle} component='button' variant='inherit'>Blogs</MLink></Link>
    </div>
  )
}

const Routes = ({setNotification, handleNotification, setUseError, user}) => {
  return (
    <Switch >
      <Route path = '/users'>
        {user ?
          <Users />
        : <Redirect to = '/'/>
        }
      </Route>
      <Route path = '/'>
        <Blogs
          setNotification = {(arg) => setNotification(arg)}
          handleNotification = {handleNotification}
          setError = {(arg) => setUseError(arg)}
        />
      </Route>
    </Switch>
  );
}

const useStyle = makeStyles({
    navbar:{
      backgroundColor: "lightgray",
      width: "100vw",
      minHeight: "60px"
    }
  });

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [useError, setUseError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyle();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in...');
    try{
      const userReturned = await loginService.login({ username: username, password: password });
      //setUser(userReturned);
      dispatch(loginUser(userReturned));
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
      dispatch(loginUser(userRemembered))
    }
  },[dispatch]);

  

  return (
    <div>
      <Router>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <div className={classes.navbar}>
            <Typography variant='h4' display="inline">blogs</Typography>
            <Navbar />
            <LoggedStatus />
          </div>
        </Grid>
        <Notification message={notification} error={useError}/>
        <Routes setUseError={setUseError} setNotification={setNotification} handleNotification={handleNotification} user={user}/>
      </Router>
      <LoginForm
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