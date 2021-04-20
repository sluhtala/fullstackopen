
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

const createBlog = {
  handleNewPost
};

export default createBlog;