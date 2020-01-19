import * as express from 'express'


export default function (app: express.Application) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + "/public/index.html"))
    });
    console.log('this ran');
    
}