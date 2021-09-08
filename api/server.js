const express = require('express');

const server = express();

const usersRouter = require('./users/users-router');

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('./middleware/middleware');

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', usersRouter);
// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found' });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: `Uh oh!: ${err.message}` });
});

module.exports = server;
