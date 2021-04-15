const logger = require('../utils/logger');
const loginRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('express-async-errors');

loginRouter.post('/', async (req, res)=>{
    const body = req.body;

    const user = await User.findOne({username: body.username});
    console.log(body, 'user', user.username );
    const passwordCorrect = user === null ? false
    : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)){
        return (res.status(401).json({error:"invalid username or password"}));
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});
    res.status(200).send({token: token, username: user.username, name: user.name });

})

module.exports = loginRouter;