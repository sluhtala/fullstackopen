const { json } = require('express');
const logger = require('./logger');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const unknownEndpoint = (req, res) =>{
    res.status(404).send({error: "unknown endpoint"});
}

const errorHandler = (error, req, res, next)=>{
    logger.error(error.message);

    switch (error.name){
        case 'ValidationError':
            return res.status(400).send({error: "ValidationError"}).end();
        case 'CastError':
            return res.status(400).send({error: "malformatted id"}).end();
        case 'JsonWebTokenError':
            return res.status(401).send({error: "invalid token"}).end();
        case 'TokenExpiredError':
            return res.status(401).send({error: "token expired"}).end();
        default:
            break ;
    }

    next(error);
}

const tokenExtractor = (req, res, next) =>{
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer '))
        req.token = authorization.substring(7);
    else
        req.token = null;
    next();
}

const userExtractor = async(req, res, next) => {
    let decodedToken = null;
    if (req.token)
        decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken)
        return res.status(401).json({error: 'token missing or invalid'});
    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
}

module.exports = {unknownEndpoint, errorHandler, tokenExtractor, userExtractor}