const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
require('dotenv').config();

console.log(process.env.TEST);
console.log(process.env.USERNAME);

//mongoose
//not tried yet
const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authSource=admin&w=1`;
// const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authMechanism=SCRAM-SHA-1&w=1`;
// const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authSource=admin&w=1`;


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

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// use the express-static middleware
app.use(express.static("public"));

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

//when a get request is sent to /stream (wants information)
app.get('/stream/', (req, res) => {
  //return message data from database
  console.log("A GET request has been sent to /stream");
  const obj = { msg: "A GET request has been sent to /stream" };
  res.send(obj);

  // Message.find({},(err, messages)=> {
    // res.send(messages);
  // })
});

//when a post request is sent to /stream (giving information)
app.post('/stream', (req, res) => {
  //posts this new information to the database
  console.log("A POST request has been sent to /stream. Its contents are:");
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.message);

  // var message = new Message(req.body);
  // message.save((err) =>{
    // if(err)
      // sendStatus(500);
    // res.sendStatus(200);
  // })
});

