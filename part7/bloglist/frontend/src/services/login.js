import axios from 'axios';
const baseUrl = '/api/login';

const login = async (user) => {
  const response =  await axios.post(baseUrl, user);
  return response.data;
}

const loginService = {
  login
}
export default loginService;