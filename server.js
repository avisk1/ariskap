const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

console.log(process.env.TEST);
console.log(process.env.USERNAME);

//mongoose
// const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authSource=admin`;
const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authMechanism=SCRAM-SHA-1`;
// const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authSource=admin`;


mongoose.connect(dbURL)
  .then(() => {
      console.log("wait did it actually work?");
  })
  .catch(err => {
      console.error('App starting error:', err);
  });


const Message = mongoose.model("messages",{ name : String, message : String})

console.log(Message);

//express
const app = express();

// use the express-static middleware
app.use(express.static("public"));

// app.get('/', (req, res) => {
//   return res.send('<h1>Hello World!</h1><script>console.log("Hello world!")</script>')
// })

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));