const logger = require('../utils/logger');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const middleware = require('../utils/middleware');
require('express-async-errors');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(blogs);
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    let decodedToken = null;
    if (request.token)
        decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id)
        return response.status(401).json({error: "token missing or invalid"});
    
    const user = request.user;

    const blog = new Blog({...request.body, user: user._id})
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
})

blogsRouter.delete('/:id', middleware.userExtractor, async(req, res)=>{
    let decodedToken = null;
    if (req.token)
        decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken)
        return response.status(401).json({error: 'token missing or invalid'});
    const blog = await Blog.findById(req.params.id);
    //does blog-user match with token user
    if (req.user.id !== blog.user.toString())
        return response.status(401).json({error: 'invalid id'});
    const result = await Blog.findByIdAndRemove(req.params.id);
    res.status(204).json(result);
})

blogsRouter.put('/:id',async (req, res)=>{
    const newContent = req.body;
    const result = await Blog.findByIdAndUpdate(req.params.id, newContent);
    res.status(200).json(result);
})

//WARNING !!!
blogsRouter.delete('/', async (req, res)=>{
    await Blog.deleteMany({});
    res.status(204).end();
})

module.exports = blogsRouter;