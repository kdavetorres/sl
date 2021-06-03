const router = require(`express`).Router();  // this is the router that'll create the routes
const passport = require(`passport`); // main package for login signup system

/* Logout */
//this is a route for logging out. It'll log out the users and then send back a message to let them know that they are successfully logged out
router.get(`/logout`, (req, res) => {
 req.logOut();
 res.json({ msg: `Logged out` });
});


/* Get login user */
//this is a route to get logged in user data
router.get(`/user`, (req, res) => {
 if (req.user) { // if user is logged in, user data will be stored on req.user
  res.json({ user: req.user });
 } else { // if user is not logged in, req.user will not exist
  res.json({ msg: `Please login to access this data` });
 }
});


/* Signup */
router.post(`/signup`, (req, res, next) => {
 passport.authenticate(`local-signup`, (err, user, info) => { // this is our passport authenticating middlewar
  // if there is any error send back the error with that error message to the user
  if (err) return res.status(400).json(err);

  // if there is no error in sign up, it'll create their account.
  req.logIn(user, (user) => {
   // if there is any error while logging in, send the error message
   if (err) return res.status(500).json({ msg: `Oops, something went wrong.` });

   // if everything is OK, send the user data onto the Cookie-fyer
   return res.json(user);
  })
 })(req, res, next)
})


/* Login */
router.post(`/login`, (req, res, next) => {
 passport.authenticate(`local-login`, (err, user, info) => { // passport middleware auth
  // error message
  if (err) return res.status(400).json(err);

  req.logIn(user, (err) => { // if there is no error, log them in
   if (err) return res.status(500).json({ msg: `Oops, something went wrong.` });   // error message

   // if everything is OK, send the user data onto the Cookie-fyer
   return res.json(user);
  })
 })(req, res, next)
})


module.exports = router;