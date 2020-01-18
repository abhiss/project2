import * as express from 'express';
import htmlRoutes from './routes/htmlRoutes';
//var db = require("./models");
import * as path from 'path'

let app = express();
var PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
// htmlRoutes(app,path)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"))
});


console.log(app.getMaxListeners());
app.get('/k', function (req, res) {
  console.log("got get request /k")
  res.send('hey you')
})
app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT);
});


