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





//when a get request is sent to /stream (wants information)
app.get('/stream/index.html', (req, res) => {
  //return message data from database
  // console.log("A GET request has been sent to /stream");
  console.log(req.hostname);
  console.log(req.params);
  console.log(req.path);
  console.log(req.originalUrl);
  console.log("GET request to index.html");
  // res.json("")
  // if (req.originalUrl == "/stream?page_load=false") {
  //   const obj = { msg: `A GET request has been sent to /stream from ${req.path}` };
  //   res.send(obj);
  // } else {
  //   console.log("Yay! It worked");
  //   return res.redirect("/stream")
  // }

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


// use the express-static middleware (apparently has to be below request handlers)
// app.use(express.static("public"));
app.use("/", express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}))

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

// var express = require('express')
// var app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/stream', function (req, res) {
//   res.send('hello world')
// })

// app.get('/stream/index.html', function (req, res) {
//   res.send('index.html')
// })

// app.get('/stream/script.js', function (req, res) {
//   res.send('script.js')
// })

// app.use("/", express.static("public"));

// app.listen(process.env.PORT || 3000, 
//   	() => console.log("Server is running..."));
  