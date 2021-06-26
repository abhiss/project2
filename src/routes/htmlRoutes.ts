import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
//import * as request from 'request'

export default function (app: express.Application) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/signin.html"))
    });
    app.post('/test', function (req, res) {

        // fs.writeFileSync(path.join(__dirname + '/file.ogg'), Buffer.from(req.body.test.replace('data:audio/webm;codecs=opus;base64,', ''), 'base64'));
        let data = req.body.test;
        // request.post({
        //     headers: { 'content-type': 'application/json' }
        //     , url: 'http://69.4.155.132:45545/sendfile', body: JSON.stringify({data:data, name:'test23'}) }
        //     , function (error, response, body) {
        //         console.log( error,'\n\n\n', response, '\n\n\n', body )
        //     });
        res.json('success');
    });
}