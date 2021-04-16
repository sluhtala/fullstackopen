import React, {useEffect, useRef, useState} from 'react'
import Togglable from './Togglable'

const FullBlog = ({blog, hide, deleteBlog})=>{
  const style = {
    margin: '10px 0 10px 0',
    padding: '10px',
    border: '1px solid black',
  };
  const handleLike = (event)=>{
    console.log('thumbs up');
  }

  return (
    <div style={style}>
      <div>
        {blog.title} {blog.author} {' '}
        <button onClick={hide}>hide</button>
      </div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} {' '}
        <button onClick={(e)=>handleLike(e)}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        <button onClick={()=>deleteBlog(blog)}>delete</button>
      </div>
    </div>
  );
}

const BlogBasic = ({visible, blog})=>{
  if (!visible)
    return null;
  return (<>{blog.title} {blog.author} {' '}</>)
}

const Blog = ({blog, deleteBlog}) => {
  const blogRef = useRef(null);
  const [visible, setVisible] = useState(true);

  return (
  <div>
    <BlogBasic
    visible={visible}
    blog={blog}/>
    <Togglable
    buttonLabel='show'
    ref={blogRef}
    callBack={()=>setVisible(!visible)}>
      <FullBlog
      blog={blog}
      hide={()=>blogRef.current.toggleHidden()}
      deleteBlog={deleteBlog}/>
    </Togglable>
  </div>  
  )
}

export default Blog