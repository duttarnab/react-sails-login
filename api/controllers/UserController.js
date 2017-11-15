/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var User = require('../models/User');
module.exports = {
  login: function (req, res) {
    var query = {};
    sails.log.debug('usernamereq: ' + req.param('username'));
    if (!!req.param('username')) {
      query = {
        username: req.param('username')
      }
    } else if (!!req.param('email')) {
      query = {
        email: req.param('email')
      }
    } else {
      return res.badRequest({message: "Either email or username is required!"})
    }

    User.findOne(query).exec(function (err, theUser) {
      if (err) return res.badRequest({message: err.details});

      if (!theUser) {
        return res.badRequest({message: 'Invalid Credentials!'});
      }

      if (theUser.verifyPassword(req.param('password'))) {
        req.session.user = theUser.toJSON();
      } else {
        req.session.user = null;
        return res.badRequest({message: 'Invalid credentials!'});
      }
      sails.log.debug("out of all blocks");
      return res.ok({
        message: "Authentication successful!",
        user: theUser
      });
    });
  },

  logout: function (req, res) {
    if (!!req.session.user) {
      req.session.user = null;
    }

    return res.ok();
  },

  create: function (req, res) {
    var username = req.param('username');
    if (!username) {
      return res.badRequest({message: 'A valid username is required'})
    }

    var email = req.param('email');
    if (!email) {
      return res.badRequest({message: 'A valid email is required'})
    }

    var password = req.param('password');
    if (!password) {
      return res.badRequest({message: 'A valid password is required'})
    }

    var name = req.param('name');
    if (!name) {
      return res.badRequest({message: 'A valid name is required'})
    }

    var role = req.param('role');
    if (!role) {
      return res.badRequest({message: 'A valid role is required'});
    }

    var userObj = {
      username: username,
      password: password,
      email: email,
      name: name,
      role: role
    };

    User.create(userObj)
      .exec(function (err, createdUser) {
        if (err) {
          // TODO: provide proper error messages
          return res.badRequest({message: err.details});
        }

        return res.json(
          createdUser
        );
      });
  },

  list: function (req, res) {
    User.find({}).exec(function (err, users) {
      if (err) {
        return res.badRequest({message: err.details});
      }

      return res.json(users);
    });
  },
  update: function (req, res) {
    var username = req.param('username');
    var email = req.param('email');
    var newPassword = req.param('newPassword');
    var name = req.param('name');
    var role = req.param('role');

    if (!email && !username) {
      return res.badRequest({message: 'Either username or email is required to update'});
    }

    var query = !email ? {username: username} : {email: email};
    User.findOne(query)
      .exec(function (err, theUser) {
        if (err) {
          return res.badRequest({message: err.details});
        }

        if (!theUser) {
          return res.badRequest({message: 'The requested user could not be found to be updated'})
        }
        var updatedUser = {};

        if (!!email) {
          updatedUser.email = email;
        }

        if (!!username) {
          updatedUser.username = username;
        }

        if (!!newPassword) {
          updatedUser.newPassword = newPassword;
        }

        if (!!name) {
          updatedUser.name = name;
        }

        if (!!role) {
          updatedUser.role = role;
        }
        User.update({username: theUser.username}, updatedUser)
          .exec(function (err, updatedUsers) {
            if (err) return res.badRequest({message: err.details});

            if (updatedUsers.length == 0) {
              return res.ok();
            }

            return res.json(updatedUsers[0]);
          });
      })
  },
  logout: function (req, res) {
    req.session.destroy(function (err) {
      return res.send(200);
    });
  },

  delete: function (req, res) {
    var username = req.param('username');
    var email = req.param('email');
    if (!email && !username) {
      return res.badRequest({message: 'Either username or email is required to delete'});
    }

    var query = !email ? {username: username} : {email: email};
    User.destroy(query)
      .exec(function (err) {
        if(err) {
          return res.badRequest({message: err.details});
        }

        return res.json({message: "User deleted successfully!"});
      });
  }
};

