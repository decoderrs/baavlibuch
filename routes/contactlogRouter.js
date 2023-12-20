const express = require('express');
const cors = require('./cors');
const bodyParser = require('body-parser');
const contactlogRouter  = express.Router();
var Contactlogs = require('../Model/contactlogs');

contactlogRouter.use(bodyParser.json());

contactlogRouter.route('/log')
.options(cors.corsWithOptions, (req,res) => {res.sendStatus(200);})
.get( cors.cors,(req,res,next) => {
    Contactlogs.find()
    .then((logs) => {
       if ( logs !== null){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(logs);
       }
       else{
        err = new Error('Server '+ req.header('Origin') + ' not found');
        err.status = 403;
        next(err);
       }
    }, err => next(err))
    .catch(err => next(err));
})

module.exports = contactlogRouter;