/* Core Modules */
const express = require(`express`);
const path = require(`path`); // it is built-in node module so no need to install it.

/* Signup-Login */
const passport = require(`passport`); // this is the main package that will help create the signup-login system.
const cookie_session = require(`cookie-session`); // this for using cookies to track users login session.


/* Firing Express App */
const app = express();
app.use(express.json()); // it allows access the data sent from frontend using req.body.
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `client`))); // saying that our file html etc., will be served.
