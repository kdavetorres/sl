const strategy = require(`passport-local`); // to create login signup strategy
const user = require(`../../models/User`); //to save or retrieve user data
const bycrypt = require(`bcryptjs`); // to hash or verify passwords
const User = require("../../models/User");


module.exports = LoginStrategy = new Strategy(
 {
  // overriding default username with email
  usernameField: `email`, // passport uses username and password to login by default, we are overriding it so that it uses email and password for logging in
  passwordField: `password`,
  passReqToCallback: true // it'll allow to use req on the following callback function
 },

 (req, email, password, done) => {
  User.findOne({ 'local.email': email }, (err, user) => { //finding the user with the email
   // if there is any error while finding, finish the process right here and send back the error to our error handler
   if (err) return done(err);

   // if there is no account with that email then let the user know that there is no account with this email
   if (!user) return done({ msg: `No user found` }, null);

   // password validation
   const isPasswordValid = bcrypt.compareSync(password, user.local.password); // it is comparing the plain password with the saved hashed password to see if they match
   if (!isPasswordValid) return done({ msg: `Invalid Credentials` }, null);

   // if everything is OK, send the user data to the password middleware on the auth route that will then send the user data onto the cookie-fyer that will then cookie-fy and store the data on a cookie
   return done(null, user)
  })
 }

)