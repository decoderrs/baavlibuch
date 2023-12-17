const express = require('express');
const bodyParser = require('body-parser')

const cors = require('./cors');
var Friends = require('../Model/Friends');

const friendRouter = express.Router();
const Upload = require('./imageupload');

friendRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors,cors.corsWithOptions, (req, res, next) => {
        Friends.find()
            .populate('friend_list')
            .then((friends) => {
                console.log('friend.find', friends)
                if (friends != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(friends);
                }
                else {
                    err = new Error('Friend ' + req.params.FriendId + ' not found ');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    
friendRouter.route('/')
    .post(cors.corsWithOptions, (req, res, next) => {
        if (req.body !== null) {
            Friends.findOne({ name: req.body.name })
                .then((found) => {
                    if (found === null) {
                        Friends.create(req.body)
                            .then((friend) => {
                                Friends.findOne({ id: friend._id })
                                    .populate('friend_list')
                                    .then((friends) => {
                                        console.log('friend saved!!');
                                        res.status = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(friends)
                                    })
                            }, err => next(err))
                            .catch(err => next(err));
                    }
                    else if (found !== null) {
                        error = new Error('User already exist: ' + req.body);
                        error.status = 403;
                        return next(error);
                    }
                }, err => next(err))
                .catch(err => next(err));
        }
        else {
            error = new Error('User Account ' + req.body + ' could not be added to the db!!');
        }
    }
    )

    module.exports = friendRouter;