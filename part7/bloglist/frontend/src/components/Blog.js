import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import blogService from '../services/blogs'
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core'; 
import { Card, CardContent, Link } from '@material-ui/core'

const FullBlog = ({ blog, handleDeleteBlog, handleLikeBlog }) => {
  const user = useSelector((state) => state.loggedIn);
  if (!blog || !user)
    return null;
  return (
    <div className = 'full-blog'>
      <Card>
        <CardContent>
            <Typography variant="h4">
              {blog.title} {'-'} {blog.author} {' '}
            </Typography>
          <div><Link  href={blog.url}>{blog.url}</Link></div>
          <div>
            {blog.likes} {' '}
            <Button variant="outlined" onClick={() => handleLikeBlog(blog)} className = 'like-button'>like</Button>
          </div>
          <Typography>
            {'Added by '}{blog.user.name}
          </Typography>
          <div>
            { user.username === blog.user.username ?
              <Button color="secondary" variant="outlined" onClick={() => handleDeleteBlog(blog)}>delete</Button>
              : ''
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Comments = ({ blog })=>{
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user = useSelector((state)=>state.loggedIn);
  const id = blog.id;

  useEffect(()=>{
    blogService.getComments(id)
    .then((response)=> setComments(response));
  },[id])

  const handleNewComment = (event) => {
    event.preventDefault();
    blogService.addComment(user, blog.id, newComment)
    .then((response)=>{
      setComments([...comments, response]);
      setNewComment('');
    })
    .catch((e)=>{
      //notification
      console.error(e)
      
    })
  }

  return (
    <div>
      <h4>comments</h4>
      <form onSubmit={handleNewComment}>
        <input type='text' placeholder='new comment' value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
        <button type='submit'>add comment</button>
      </form>
      {comments ?
        <ul>
          {comments.map((com, i)=>(<li key={parseInt(blog.id) + i}>{com}</li>))}
        </ul>
      : ''}
    </div>
  )
}

const Blog = ({ blogs, handleDeleteBlog, handleLikeBlog }) => {
  const blogRef = useRef(null);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id)
  if (!blog)
    return (null);
  return (
    <div className='blog'>
      <FullBlog
        blog = {blog}
        hide = {() => blogRef.current.toggleHidden()}
        handleDeleteBlog = {handleDeleteBlog}
        handleLikeBlog = {handleLikeBlog}/>
      <Comments blog = {blog}/>
    </div>
  )
}

export default Blog