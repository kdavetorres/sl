const mongoose = require(`mongoose`);


/* Sub Schema  */
const local_schema = new mongoose.Schema({
 email: String,
 password: String
});


/* Main Schema */
const user_schema = new mongoose.Schema({
 local: local_schema, // I'm using this sub schema now because we will be creating Login with Google Twitter Linkedin Github etc, so it'll help us in the future too.
 username: String
});


/* User Model */
module.exports = User = mongoose.model(`User`, user_schema);