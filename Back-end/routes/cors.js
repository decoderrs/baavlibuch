const express = require('express');
const cors = require('cors');

const app = express();
const Contactlogs = require('../Model/contactlogs');

const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

var CorsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log('CORS ORIGIN', req.header('Origin'));
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        let data = {};
        Contactlogs.findOne({ localhost_name: req.header('Origin')})
        .then(log => data = log)
        console.log('Checking here', data);
        if (data !== undefined) {
            // console.log('found the object', );
            Contactlogs.findOne({ localhost_name: req.header('Origin') })
                .then((log) => {
                    if (log !== null) {
                        log.nos_connections += 1;
                        // console.log('log object', log);
                        Contactlogs.findByIdAndUpdate(log._id, {
                            $set: log
                        }, { new: true })
                            .then((log) => {
                                // console.log('no of logs: ', log);
                            })
                    }
                }, err => console.log(err))
                .catch(err => console.log(err));
        }
        else {
            Contactlogs.create({ localhost_name: req.header('Origin'), nos_connections: 1 })
                .then((log) => {
                    // console.log('no of logs: ' + log);
                })
        }
        corsOptions = { origin: true };
    }
    else {

        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
}

exports.cors = cors();
exports.corsWithOptions = cors(CorsOptionsDelegate);