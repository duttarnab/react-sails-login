/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  User.find({}).exec(function (err, foundUsers) {
    if (err) {
    }
    sails.log.debug("Found users: "+typeof(foundUsers));
    sails.log.debug("Found users: "+JSON.stringify(foundUsers));
    if (foundUsers.length == 0) {
      var userObj = {
        username: "libraryssaa",
        password: "hariom1234#",
        email: "ssaa@gmail.com",
        name: "SSAA Library",
        role: "ROLE_SUPERADMIN"
      };

      User.create(userObj).exec(function (err, createdUser) {
        if (err) {
          sails.log.debug("Could not create user in bootstrap. Err: " + err);
          return;
        }

        sails.log.debug("Created the default user: " + createdUser);
      });
    }
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
