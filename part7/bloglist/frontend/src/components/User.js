import { useParams } from 'react-router-dom'
import { Typography, List, ListItem } from '@material-ui/core'

const User = ({ users })=>{
  const id = useParams().id;
  const user = users.find((u)=>u.id === id);
  console.log(user);
  if (!user)
    return null;
  return (
    <div>
      <Typography variant="h4" component="h4">{user.name}</Typography>
      <Typography>added Blogs</Typography>
      <List xs={1}> 
        {user.blogs.map((blog)=>(<ListItem divider={true} key={blog.id}>{blog.title}</ListItem>))}
      </List>
    </div>
  )
}

export default User;