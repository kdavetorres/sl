const passport = require(`passport`); // main package for creating signup-login system
const user = require(`../models/User`); // to save or retrieve user data 
const LoginStrategy = require("./passportStrategies/LoginStrategy");


const login_strategy = require(`./passportStrategies/LoginStrategy`);
const SignupStrategy = require("./passportStrategies/SignupStrategy");
const signup_strategy = require(`./passportStrategies/SignupStrategy`);


/* Searialize and Deserialize */
//this is our cookie-fyer machine, it'll take the user data and cookie-fy it and store it on a cookie, here we will only cookie-fy the id of the user because we do not want to store his email and password on the cookie for security purpose
passport.serializeUser((user, done) => {
 done(null, user.id);
});


// this is the de-cookie-fyer machine. When a user with the cookie comes to the website, it asks and show the cookie so that it knows that the user is already logged in. Then it will de-code the cookie and get that id we stored out of the cookie and find the user who has this id, then it will retrieve it's data and store in in a user object and it will attach it on our req object. so now if user is logged-in we can access his data with req.user
passport.deserializeUser((id, done) => {
 User.findById(id).then(user => done(null, user));
});


/* Strategies */
// here we are using those strategies we created
passport.use(`local-signup`, SignupStrategy); // we are also giving them name so that we can reference them by name later
passport.use(`local-login`, LoginStrategy); // same thing here too