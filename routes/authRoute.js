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