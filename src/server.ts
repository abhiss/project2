import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
const sequelize = require('./config/config');


import htmlRoutes from './routes/htmlRoutes';
import * as user from './routes/user';
import * as cors from 'cors'
//var db = require("./models");
import * as path from 'path'

let app = express();
var sess = {
  secret: process.env.APP_SECRET,
  cookie: {
    secure: false
  }
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

var PORT = process.env.PORT || 3000;

app.use(session(sess));


// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors())
//put requests in there :)
//app.use(require('./routes'));
htmlRoutes(app)


app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT);
  sequelize.sync({ force: false });
});