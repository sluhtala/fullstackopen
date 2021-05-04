const axios = require('axios');
const baseUrl = '/api/users'

const getAll = async () => {
  const resposnse = await axios.get(baseUrl);
  return resposnse.data;
}

const userService = {
  getAll
}

export default userService;