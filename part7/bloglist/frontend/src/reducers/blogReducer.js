import blogService from '../services/blogs'

const blogReducer = (state = [], action)=>{
  switch(action.type)
  {
    case 'ADD':
      const newBlog = {...action.data};
      const newState = state.concat(newBlog);
      return newState;
    case 'LIKE':
      const id = action.data.id;
      const stateCpy = [...state];
      let blogIndex = null;
      stateCpy.forEach((b, i)=>{
        if (b.id === id)
          blogIndex = i;
      })
      stateCpy.splice(blogIndex, 1, {...action.data})
      return stateCpy;
    case 'DELETE':
      const deletedBlogs = [...state];
      let index = null;
      state.forEach((b, i)=>{
        if (b.id === action.data.id)
          index = i;
      })
      deletedBlogs.splice(index, 1);
      return deletedBlogs;
    case 'INIT':
      const initialized = [...action.data];
      return initialized;
    default:
      return state;
  }
}

export const addBlog = (user, blog) => {
  return (async(dispatch)=>{
    const newBlog = await blogService.createNew(user, blog);
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  })
}

export const likeBlog = (user, blog) => {
  return (async(dispatch)=>{
    try{
      const newBlog = {...blog, likes: blog.likes + 1}
      await blogService.likePost(user, newBlog)
      dispatch({
        type: 'LIKE',
        data: newBlog
      })
    }
    catch (e){
      console.log(e);
    }
  })
}

export const initializeBlogs = () =>{
  return (async(dispatch)=>{
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs
    })
  })
}

export const deleteBlog = (user ,id) =>{
  return (async (dispatch)=>{
    await blogService.deletePost(user, id)
    dispatch({
      type: 'DELETE',
      data: {id:id}
    })
  })
}

export default blogReducer;