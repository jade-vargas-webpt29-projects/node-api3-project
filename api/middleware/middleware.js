const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date();
  req.timestamp = timestamp;
  console.log(`${req.method} - ${req.url} - ${req.timestamp} `);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else if (!user) {
        next({ message: 'user not found', status: 404 });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    next({ message: `missing required name field`, status: 400 });
  } else {
    next(req.body);
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    next({ message: `missing required text field`, status: 400 });
  } else {
    next(req.body);
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validatePost, validateUser, validateUserId };
