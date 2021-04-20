import React, { useRef, useState } from 'react'
import Togglable from './Togglable'

const FullBlog = ({ blog, hide, deleteBlog, likeBlog }) => {
  const style = {
    margin: '10px 0 10px 0',
    padding: '10px',
    border: '1px solid black',
  };

  return (
    <div style={style} className = 'full-blog'>
      <div>
        {blog.title} {blog.author} {' '}
        <button onClick={hide}>hide</button>
      </div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} {' '}
        <button onClick={() => likeBlog(blog)} className = 'like-button'>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        <button onClick={() => deleteBlog(blog)}>delete</button>
      </div>
    </div>
  );
}

const BlogBasic = ({ visible, blog }) => {
  if (!visible)
    return null;
  return (<div className = 'blog-basic'>{blog.title} {blog.author} {' '}</div>)
}

const Blog = ({ blog, deleteBlog, likeBlog }) => {
  const blogRef = useRef(null);
  const [visible, setVisible] = useState(true);

  return (
    <div className='blog'>
      <BlogBasic
        visible = {visible}
        blog = {blog}/>
      <Togglable
        buttonLabel = 'show'
        ref = {blogRef}
        callBack = {() => setVisible(!visible)}>
        <FullBlog
          blog = {blog}
          hide = {() => blogRef.current.toggleHidden()}
          deleteBlog = {deleteBlog}
          likeBlog = {likeBlog}/>
      </Togglable>
    </div>
  )
}

export default Blog