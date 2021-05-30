/* Core Modules */
const express = require(`express`);
const path = require(`path`); // it is built-in node module so no need to install it.

/* Signup-Login */
const passport = require(`passport`); // this is the main package that will help create the signup-login system.
const cookie_session = require(`cookie-session`); // this for using cookies to track users login session
