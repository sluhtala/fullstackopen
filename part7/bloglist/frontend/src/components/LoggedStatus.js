import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loggedUserReducer';
import { Button } from '@material-ui/core'; 

const LoggedStatus = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.loggedIn);

  const logOut = () =>
  {
    sessionStorage.removeItem('user-logged');
    //setUser(null);
    dispatch(logoutUser());
  }

  if (!user)
    return null;
  return (
    <div style={{display: 'inline'}}>
      {user.name} logged in {' '}
      <Button
        variant="outlined"
        onClick = {() => {logOut()}}
      >logout</Button>
    </div>
  );
}

export default LoggedStatus;