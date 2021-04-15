import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const Notification = ({message, error}) =>
{
  if (!message)
    return null;
  return (
      <h2 className={
        error ? 'notification error'
        : 'notification'
      }>{message}</h2>
  );
}

const Blogs = ({user})=>{
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    if(!user)
      return ;
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  if (!user)
    return (null);
  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
     </>
  );
}

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
      console.log(userReturned);
      setUsername('');
      setPassword('');
    }
    catch (e){
      setNotification('Wrong credentials');
      setUseError(true);
      setTimeout(()=>{
        setNotification(null);
        setUseError(false);
      },5000)
    }
  }

  return (
    <div>
      <Notification message={notification} error={useError}/>
      <Blogs user={user}/>
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