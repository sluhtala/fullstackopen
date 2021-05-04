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
    response.status(200).json(blogs).end();
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user;
    const blog = new Blog({...request.body, user: user._id})
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await User.updateOne({_id: user.id})
    //await User.save(user);
    response.status(201).json(result).end();
})

blogsRouter.delete('/:id', middleware.userExtractor, async(req, res)=>{
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

blogsRouter.get('/:id/comments', async (req, res) => {
  const id = req.params.id;
  const result = await Blog.findById(id);
  res.status(200).json(result.comments);
})

blogsRouter.put('/:id/comments', middleware.userExtractor, async (req, res) => {
  const comment = req.body.comment;
  const blog = await Blog.findById(req.params.id);
  if (!blog.comments)
    blog.comments = [];
  const comments = blog.comments.concat(comment);
  const id = req.params.id;
  await Blog.updateOne({_id: id}, {comments: comments}, {upsert: true});
  res.status(201).json(req.body);
})

//WARNING !!!
blogsRouter.delete('/', async (req, res)=>{
    await Blog.deleteMany({});
    res.status(204).end();
})

module.exports = blogsRouter;