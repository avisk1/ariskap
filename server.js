const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

//mongoose
const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xpx7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&authSource=admin`;

mongoose.connect(dbURL , (err) => { 
  console.log("mongodb connected YAY!!!", err);
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});

const Message = mongoose.model("Message",{ name : String, message : String})

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