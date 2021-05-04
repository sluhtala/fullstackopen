import { useEffect, useState } from 'react'
import userService from '../services/users'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import User from './User'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

const UserBasic = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </TableCell>
      <TableCell>
        {user.blogs.length}
      </TableCell>
    </TableRow>
  );
};

const AllUsers = ({users}) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>user</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => <UserBasic key={user.id} user={user}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  /*
  return (
    <div>
      <h2>Users</h2>
      <table >
        <thead>

          <tr><th/><th>blogs created</th></tr>
        </thead>
        <tbody>
          {users.map((user) => <UserBasic key={user.id} user={user}/>)}
        </tbody>
      </table>
    </div>
  )
  */
}

const Users = () => {
  const [users, setUsers] = useState([]); 

  useEffect(()=>{
    userService.getAll().then((response)=>{
      setUsers(response);
    });
  },[])

  return (
    <Router>
      <Switch >
        <Route path = '/users/:id'>
          <User users = {users}/>
        </Route>
        <Route path = '/users'>
          <AllUsers users = {users}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default Users;