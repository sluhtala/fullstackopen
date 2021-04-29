import PropTypes from 'prop-types';
import React from 'react';

const LoginForm = ({ user, submit, username, password, setUsername, setPassword }) => {
  if (user)
    return (null);
  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={(e) => submit(e)}>
        <div>
          username
          <input id = 'username-input' value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password
          <input id = 'password-input' value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <input id = 'login-button' type='submit' value='login'></input>
      </form>
    </div>
  )
}

LoginForm.propType = {
  submit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm;
