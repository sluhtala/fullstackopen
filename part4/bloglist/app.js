const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const blogsRouter = require('./routes/blogs');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const middleware = require('./utils/middleware');
const cors = require('cors')

logger.info('connecting to db...');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(()=>{
    logger.info('connected to mongodb');
})
.catch((e)=>{
    logger.error('error connecting to mongodb', e);
});

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor);
//app.use(middleware.userExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;