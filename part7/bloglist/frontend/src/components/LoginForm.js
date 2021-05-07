import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Grid } from '@material-ui/core';

const LoginForm = ({ submit, username, password, setUsername, setPassword }) => {
  const user = useSelector(state=>state.loggedIn)

  if (user)
    return (null);
  return (
    <div>
      <Typography variant="h3">Login to application</Typography>
      <form onSubmit={(e) => submit(e)}>
        <div>
          <TextField className="standard-basic" label="username" value={username} onChange={({target})=>setUsername(target.value)} />
        </div>
        <div>
          <TextField className="standard-basic" label="password" type="password" value={password} onChange={({target})=>setPassword(target.value)} />
        </div>
          <Button style={{margin:"10px 0 0 0"}} variant="outlined" id = 'login-button' type='submit' value='login'>login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm;