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


/* Cookies and Passports */
app.use(cookie_session({
 cookie_expi: 24 * 60 * 60 * 1000, // it is the total expiration time the cookies will be alive for 1 day.
 keys: [`1d21d6d5bffbb044b90d5ca56abf3446ff9a50e9`] // the string you can type whatever you want instead. 
}));


/* Configuration */
require(`./config/mongodbConfig`); // the mongodbConfig file that our database configuration.
require(`./config/passportConfig`); // the passportConfig file that our signup-login configuration.


/* Routes */
app.use(require(`./routes/authRoute`)); // signup-login routes.
// if there is any route that does not match the above routes, sends the index.html file as default page.
app.get(`*`, (req, res, next) => { // request, responds.
 try {
  res.sendFile(path.join(__dirname, `client/index.html`));
 } catch (err) {
  next(err, req, res)
 }
});


/* Error Handlers */
app.use((err, req, res, next) => {
 console.log(err.message);

 console.log(err);
 res.json({ msg: `Server Error`, error: err.message })
});


/* PORT */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});