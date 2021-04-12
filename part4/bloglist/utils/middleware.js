const logger = require('./logger');

const unknownEndpoint = (req, res) =>{
    res.status(404).send({error: "unknown endpoint"});
}

const errorHandler = (error, req, res, next)=>{
    logger.error(error.message);
    next(error);
}

module.exports = {unknownEndpoint, errorHandler}