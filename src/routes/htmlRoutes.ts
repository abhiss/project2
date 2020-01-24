import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path';

export default function (app: express.Application) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + "/public/index.html"))
    });
    console.log('this ran');
    app.post('/test', function (req, res) {

<<<<<<< HEAD
        console.log(req.body.test)
        fs.writeFileSync(path.join(__dirname + '/test.ogg'), Buffer.from(req.body.test.replace('data:audio/webm;codecs=opus;base64,', ''), 'base64'));
=======
        //console.log(req.body.test)
        fs.writeFileSync(__dirname + '/files.ogg', Buffer.from(req.body.test.replace('data:audio/webm;codecs=opus;base64,', ''), 'base64'));
>>>>>>> 703ba3c352d9543a999c593aa343063d42c33c90

        res.json('success');
    });
}