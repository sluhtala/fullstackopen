import Blog from './Blog'
import blogService from '../services/blogs'
import React, { useState, useEffect, useRef} from 'react'
import Togglable from './Togglable'

const LoggedStatus = ({user, setUser})=>{

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
      onClick={()=>{logOut()}}
      >logout</button>
      <br/>
      <br/>
    </div>
  );
}

const CreateBlog = ({user, setNotification, setError, blogs, setBlogs, hideForm})=>{
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const  handleNewPost = async (event)=>{
    event.preventDefault();
    const newPost = {
      title: title,
      author: author,
      url: url
    };
    console.log(newPost);
    try{
      const response = await blogService.createNew(user, newPost)
      console.log(response);
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification("new blog created");
      setError(false);
      setTimeout(()=>{
        setNotification(null);
      }, 5000);
      setBlogs([...blogs, response]);
      hideForm();
    }
    catch (e){
      setNotification("error creating blog");
      setError(true);
      setTimeout(()=>{
        setNotification(null);
        setError(false);
      }, 5000);
    }
  }

  if (!user)
    return null;
  return (
    <form onSubmit={(e)=>handleNewPost(e)}>
      <div>
        title:
        <input value={title} onChange={({target})=>setTitle(target.value)}></input>
      </div>
      <div>
        author:
        <input value={author} onChange={({target})=>setAuthor(target.value)}></input>
      </div>
      <div>
        url:
        <input value={url} onChange={({target})=>setUrl(target.value)}></input>
      </div>
      <div>
        <input type="submit" value="create"></input>
      </div>
    </form>

  );
}

const Blogs = ({user, setUser, setNotification, setError})=>{
  const [blogs, setBlogs] = useState([])
  const formRef = useRef(null);

  useEffect(() => {
    if(!user)
      return ;
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  const deleteBlog = async(blog)=>{
    try{
      const response = await blogService.deletePost(user,blog.id);
      console.log(response);
      let index = null;
      blogs.forEach((b, i)=>{
        if (b.id === blog.id)
          index = i;
      })
      if (index)
      {
        let blogsCpy = [...blogs];
        blogsCpy.splice(index, 1);
        setBlogs(blogsCpy);
      }
    }
    catch(e){
      setNotification('Error deleting post');
      setError(true);
      setTimeout(()=>{
        setError(false);
        setNotification(null);
      },5000);
    }

  }

  if (!user)
    return (null);
  return (
    <>
      <h2>blogs</h2>
      <LoggedStatus user={user} setUser={setUser}/>
      <Togglable buttonLabel='create new' ref={formRef} cancelButton={true}>
        <CreateBlog
        user={user}
        setNotification={setNotification}
        setError={setError}
        blogs={blogs}
        setBlogs={(arg)=>setBlogs(arg)}
        hideForm={()=>formRef.current.toggleHidden()}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id}
        blog={blog}
        deleteBlog={(blog)=>deleteBlog(blog)}/>
      )}
     </>
  );
}


export default Blogs;