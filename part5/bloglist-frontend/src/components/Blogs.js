import Blog from './Blog'
import blogService from '../services/blogs'
import React, { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable'
import Form from './NewBlogForm'

const LoggedStatus = ({ user, setUser }) => {

  const logOut = () =>
  {
    sessionStorage.removeItem('user-logged');
    setUser(null);
  }

  if (!user)
    return null;
  return (
    <div>
      {user.name} logged in {' '}
      <button
        onClick = {() => {logOut()}}
      >logout</button>
      <br/>
      <br/>
    </div>
  );
}

const CreateBlog = ({ user, setNotification, setError, blogs, setBlogs, hideForm }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const  handleNewPost = async (event) => {
    event.preventDefault();
    const newPost = {
      title: title,
      author: author,
      url: url
    };
    try{
      const response = await blogService.createNew(user, newPost)
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification('new blog created');
      setError(false);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setBlogs([...blogs, response]);
      hideForm();
    }
    catch (e){
      setNotification('error creating blog');
      setError(true);
      setTimeout(() => {
        setNotification(null);
        setError(false);
      }, 5000);
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

const Blogs = ({ user, setUser, setNotification, setError }) => {
  const [blogs, setBlogs] = useState([])
  const formRef = useRef(null);

  useEffect(() => {
    if(!user)
      return ;
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  useEffect(() => {
    //sort blogs if not sorted
    if (!blogs || blogs.length === 0)
      return ;
    let sorted = true;
    blogs.forEach((b,i) => {
      if (i >= blogs.length - 1)
        return;
      if (blogs[i+1].likes > b.likes)
        sorted = false;
    })
    if (sorted)
      return ;
    const blogscpy = [...blogs];
    blogscpy.sort((a,b) => b.likes - a.likes);
    setBlogs(blogscpy);
  },[blogs])

  const likeBlog = async (blog) => {
    try{
      const newBlog = { ...blog };
      newBlog.user = user.id;
      newBlog.likes += 1;
      await blogService.likePost(user, newBlog);
      const blogsCpy = [...blogs];
      blogsCpy.forEach((b) => {
        if (b.id === blog.id)
          b.likes += 1;
      });
      setBlogs(blogsCpy);
    }
    catch(e){
      setNotification('error liking post');
      setError(true);
      setTimeout(() => {
        setNotification(null);
        setError(false);
      }, 5000);
    }
  }

  const deleteBlog = async(blog) => {
    if (!window.confirm(`Delete ${blog.title}?`))
      return ;
    try{
      await blogService.deletePost(user,blog.id);
      let index = null;
      blogs.forEach((b, i) => {
        if (b.id === blog.id)
        {
          index = i;
        }
      })
      if (index !== null)
      {
        let blogsCpy = [...blogs];
        blogsCpy.splice(index, 1);
        setBlogs(blogsCpy);
      }
    }
    catch(e){
      setNotification('Error deleting post');
      setError(true);
      setTimeout(() => {
        setError(false);
        setNotification(null);
      }, 5000);
    }}

  if (!user)
    return (null);
  return (
    <div className= 'blogs'>
      <h2>blogs</h2>
      <LoggedStatus user = {user} setUser = {setUser}/>
      <Togglable buttonLabel = 'create new' ref = {formRef} cancelButton = {true}>
        <CreateBlog
          user = {user}
          setNotification = {setNotification}
          setError = {setError}
          blogs = {blogs}
          setBlogs = {(arg) => setBlogs(arg)}
          hideForm = {() => formRef.current.toggleHidden()}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key = {blog.id}
          blog = {blog}
          deleteBlog = {(blog) => deleteBlog(blog)}
          likeBlog = {(blog) => likeBlog(blog)}/>
      )}
    </div>
  );
}


export default Blogs;