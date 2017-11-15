/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  var curUser = req.session.user;
  if (!!curUser && (curUser.role == "ROLE_VIEWER" || curUser.role == "ROLE_SUPERADMIN" || curUser.role == "ROLE_ADMIN")) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden({message: 'You are not permitted to perform this action.'});
};
