import axios from 'axios'
const baseUrl = '/api/blogs'

const setAuthorization = (user) => {
  const config = { headers: { Authorization: `bearer ${user.token}` } };
  return (config);
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (user, newBlog) => {
  const request = await axios.post(baseUrl, newBlog, { headers: { Authorization : `bearer ${user.token}` } });
  return (request.data);
}

const deletePost = async (user, blogId) => {
  const url = `${baseUrl}/${blogId}`;
  const request = await axios.delete(url, setAuthorization(user));
  return (request.data);
}

const likePost = async (user, blog) => {
  const url = `${baseUrl}/${blog.id}`;
  const newBlog = {...blog, user: user.id};
  const request = await axios.put(url, newBlog, setAuthorization(user));
  return (request.data);
}

const getComments = async (blogId) => {
  const url = `${baseUrl}/${blogId}/comments`;
  const request = await axios.get(url);
  return (request.data);
}

const addComment = async (user, blogId, comment) => {
  const url = `${baseUrl}/${blogId}/comments`;
  const data = {comment : comment};
  const request = await axios.put(url, data, setAuthorization(user));
  return request.data.comment;
}

const blogService = {
 getAll, createNew, deletePost, likePost, getComments, addComment
}
export default blogService;