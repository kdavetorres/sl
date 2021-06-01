const strategy = require(`passport-local`); // this is to create the login signup strategies
const user = require(`../../models/User`); // the User model to save the user data also to retrieve data
const bcrypt = require(`bcryptjs`); // to hash the password
const User = require("../../models/User");

module.exports = SignUpStrategy = new Strategy(
 {
  // overriding the default username with email
  usernameField: `email`, // users signup with email and password
  passwordField: `password`,
  passReqToCallback: true  // //this will allow use use request on the following callback function
 },


 (req, email, password, done) => {

  const { username } = req.body; // retrieving username from the data that frontend sent to us. Here we'll also retrieve other data if it sent us, like first name last name location etc. To keep it simple I'm just using username. One more thing You don't need to retrieve email of password this way because passport LIB will already retrieving it for you


  User.findOne({ 'local.email': email }, (err, user) => { // checking if there is already an user with this email


   // if there is an error while checking
   if (err) return done(err); // finish this process right here and send back error to our error handler


   // if there is already an account with the email, we'll finish the process right here and notify the user that this email is already taken
   if (user) return done({ msg: `This email is already taken` }, null);


   // if this email is not already taken, create a new account with the email
   User.create({
    'local.email': email,
    'local.password': bcrypt.hashSync(password, bcrypt.genSaltSync()), //  hashed password
    username
   }).then(newUser => done(null, newUser)); // when the account has been created, send this data onto the passport middleware on the auth route and that middleware will send this data back to the cookie-fyer which will then cookie-fy our data and store it in a cookie

  })

 }
)