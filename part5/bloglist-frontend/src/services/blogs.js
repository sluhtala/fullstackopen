import axios from 'axios'
const baseUrl = '/api/blogs'

const setAuthorization = (user)=>{
  const config = {headers: {Authorization: `bearer ${user.token}`}};
  return (config);
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (user, newBlog) => {
  const request = await axios.post(baseUrl, newBlog, {headers: {Authorization : `bearer ${user.token}`}});
  return (request.data);
}

const deletePost = async (user, blogId) =>{
  const url = `${baseUrl}/${blogId}`;
  const request = await axios.delete(url, setAuthorization(user));
  return (request.data);
}

export default { getAll, createNew, deletePost }