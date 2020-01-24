import * as express from 'express';
import * as bodyParser from 'body-parser'

import htmlRoutes from './routes/htmlRoutes';
import * as cors from 'cors'
//var db = require("./models");
import * as path from 'path'

let app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors())
//put requests in there :)
htmlRoutes(app)

app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT);
  
});