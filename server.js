// const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config();


// https://devcenter.heroku.com/articles/config-vars

console.log(process.env.TEST);
console.log(process.env.DB_USERNAME);
console.log(process.env.PASSWORD);

//mongoose
//not tried yet
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/siteDatabase?authSource=admin&w=1`;
// const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authMechanism=SCRAM-SHA-1&w=1`;
// const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?authSource=admin&w=1`;


const Message = mongoose.model("messages",{ name : String, message : String})

mongoose.connect(dbURL)
  .then(() => {
      console.log("wait did it actually work?");
  })
  .catch(err => {
      console.error('App starting error:', err);
  });



//express
// const http = require('http');
// const app = express();
// const server = http.createServer(app);
// const io = require('socket.io')(server);


// io.on("connection", socket => {
//   // either with send()
//   socket.send("Hello!");

//   // or with emit() and custom event names
//   socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

//   // handle the event sent with socket.send()
//   socket.on("message", (data) => {
//     console.log(data);
//   });

//   // handle the event sent with socket.emit()
//   socket.on("salutations", (elem1, elem2, elem3) => {
//     console.log(elem1, elem2, elem3);
//   });
// });

var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.json());
app.use(express.urlencoded({extended: false}))


//when a get request is sent to /stream (wants information)
app.get('/stream/index.html', (req, res) => {
  //return message data from database
  console.log(req.hostname);
  console.log(req.params);
  console.log(req.path);
  console.log(req.originalUrl);
  console.log("GET request to index.html");

  Message.find({},(err, messages)=> {
    res.json(messages);
  })
});

//when a post request is sent to /stream (giving information)
app.post('/stream/index.html', (req, res) => {
  //posts this new information to the database
  console.log("A POST request has been sent to /stream/index.html. Its contents are:");
  console.log(req.body);
  var message = new Message(req.body);
  message.save((err) =>{
    if(err) {
      console.log("You have an error, sir:");
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("Message posted to database");
      io.emit('message', req.body);
      res.sendStatus(200);
    }
  })
});


// use the express-static middleware (apparently has to be below request handlers)
// app.use(express.static("public"));
app.use("/", express.static("public"));


// start the server listening for requests
// app.listen(process.env.PORT || 3000, 
// 	() => console.log("Server is running..."));