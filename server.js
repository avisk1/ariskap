var express = require("express");

var app = express();

// use the express-static middleware
app.use(express.static("public"))

app.get('/', (req, res) => {
  return res.send('<h1>Hello World!</h1><script>console.log("Hello world!")</script>')
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));