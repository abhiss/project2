import * as express from 'express';
//var db = require("./models");

export let app = express();
var PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + './public'));


app.get('/',function(req, res){
  console.log("got get request /")
  res.send('hey you')
})

app.listen(PORT, function() {
  console.log("Server listening on port: " + PORT);
});

