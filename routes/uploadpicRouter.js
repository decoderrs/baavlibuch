const express = require('express');
const bodyParser = require('body-parser');
 var cors = require('./cors');

var Upload = require('./imageupload');

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corsWithOptions, (req,res) => res.sendStatus(200))
.get(cors.cors,cors.corsWithOptions, (req,res) => {
    console.log("images");
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.cors, cors.corsWithOptions,Upload.single('profile_pic') ,(req,res) => {
    console.log(req.file,JSON.stringify(req.body));
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(JSON.stringify(req.file),JSON.stringify(req.body));
})

module.exports = uploadRouter;