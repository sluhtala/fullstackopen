const userRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');


userRouter.get('/', async (req, res)=>{
    const result = await User.find({}).populate('blogs',{url: 1, title: 1, author: 1});
    res.json(result);
})

const validatePassword = (password)=>{
    if (!password)
        return false;
    if (password.length < 3)
        return false;
    return true;
}

userRouter.post('/', async (req, res)=>{
    const body = req.body;
    const saltRounds = 10;
    console.log(body.username);
    if (validatePassword(body.password) === false)
    {
        const err = new Error("ValidationError");
        err.name = "ValidationError";
        throw err;
        return;
    }
    const newUser = new User({
        username: body.username,
        password: await bcrypt.hash(body.password, saltRounds),
        name: body.name,
        blogs: []
    });
    const result = await newUser.save();
    res.status(201).send(result);
})

//WARNING!!!!

userRouter.delete('/', async(req, res)=>{
    await User.deleteMany({});
    res.status(204).end();
})

module.exports = userRouter;