import * as express from 'express';

import htmlRoutes from './routes/htmlRoutes';
import * as cors from 'cors'
//var db = require("./models");
import * as path from 'path'

let app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors())
//put requests in there :)
htmlRoutes(app)

app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT);
  
});