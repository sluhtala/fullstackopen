const router = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

router.post('/reset', async (request, response) => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});

    response.status(204).end();
    console.log('cleared');
  }
  catch (error) {
    console.error(error);
  }
})

module.exports = router;