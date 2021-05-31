/* Database Configuration */
const mongoose = require(`mongoose`);

mongoose.connect(`mongodb + srv://dbUser:<password>@cluster0.1tfvd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
 },

 (err) => {
  if (err) throw err;
  console.log(`Connected to MongoDB`);
 }
)





// mongodb + srv://dbUser:<password>@cluster0.1tfvd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbUser:<password>@cluster0.1tfvd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//  const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//  client.close();
// });
