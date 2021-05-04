import Blog from './Blog'
import React, { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'
import Form from './NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Route, Link, Switch } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core'

const CreateBlog = ({  hideForm, handleNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state=>state.loggedIn);

  const  handleNewPost = async (event) => {
    event.preventDefault();
    const newPost = {
      title: title,
      author: author,
      url: url
    };
    try{
      await dispatch(addBlog(user, newPost));
      setTitle('');
      setAuthor('');
      setUrl('');
      handleNotification('new blog created', 5000, false);
      hideForm();
    }
    catch (e){
      handleNotification('error creating blog', 5000, true)
    }
  }

  if (!user)
    return null;
  return (
    <div className = 'form-div'>
      <Form handleSubmit = {(e) => handleNewPost(e)}
        title = {title} setTitle = {(t) => setTitle(t)}
        author = {author} setAuthor = {(a) => setAuthor(a)}
        url = {url} setUrl = {(u) => setUrl(u)}/>
    </div>
  );
}

const Blogs = ({ setNotification, setError, handleNotification }) => {
  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const user = useSelector(state=>state.loggedIn)

  useEffect(() => {
    if(!user)
      return ;
    console.log('blogs')
    dispatch(initializeBlogs())
  }, [user, dispatch])

  const handleLikeBlog = (blog) => {
    try{
      dispatch(likeBlog(user, blog))
      handleNotification(`${blog.title} liked`, 4000, false);
    }
    catch(e){
      handleNotification('error liking post', 5000, true);
    }
  }

  const handleDeleteBlog = async(blog) => {
    if (!window.confirm(`Delete ${blog.title}?`))
      return ;
    try{
      dispatch(deleteBlog(user, blog.id))
    }
    catch(e){
      handleNotification('Error deleting post', 5000, true)
    }}


  if (!user)
    return (null);
  return (
    <div className = 'blogs' style={{margin:"10px 0 0 0"}}>
        <Switch>
          <Route path = '/blogs/:id'>
            <Blog blogs = {blogs}
              handleDeleteBlog = {handleDeleteBlog}
              handleLikeBlog = {handleLikeBlog}
            />
          </Route>
          <Route path = '/'>
          <Togglable buttonLabel = 'create new' ref = {formRef} cancelButton = {true}>
            <CreateBlog
              user = {user}
              setNotification = {setNotification}
              setError = {setError}
              blogs = {blogs}
              hideForm = {() => formRef.current.toggleHidden()}
              handleNotification = {handleNotification}
          />
        </Togglable>
          <div>
            <List>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <div key={blog.id}>
               <Link to={`/blogs/${blog.id}`} style={{textDecoration:"none"}}><ListItem button alignItems="center">{blog.title}</ListItem></Link>
              </div>
            )}
            </List>
          </div>
          </Route>
        </Switch>
    </div>
  );
}


export default Blogs;