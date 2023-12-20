const express = require('express');
const bodyParser = require('body-parser')

const cors = require('./cors');
var Friends = require('../Model/Friends');

const friendRouter = express.Router();
const Upload = require('./imageupload');
const { mongoose, isValidObjectId } = require('mongoose');

friendRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, cors.corsWithOptions, (req, res, next) => {
        Friends.find()
            .populate('friend_list')
            .then((friends) => {
                // console.log('friend.find', friends);
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
    .post(cors.corsWithOptions,Upload.single('profile_pic'), (req, res, next) => {
        console.log("checking here11", req.file,"rock-paper",req.body);
        if (req.body !== null) {
            Friends.findOne({ name: req.body.name })
                .then((found) => {
                    var filepath = `E:\\Mayur\\MernStackProject\\ExpressJS\\Bavlibuch\bavlibuch${req.file.path}`;
                    if (found === null) {
                        Friends.create({
                            name: req.body.name,
                            age: req.body.age,
                            gender: req.body.gender,
                            profile_pic: filepath,
                            friend_list: []
                        }
                        )
                         .then((friends) => {
                                        console.log('friend saved!!');
                                        res.status = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(friends)
                                    }, err => next(err))
                            .catch(err => next(err));
                    }
                    else if (found !== null) {
                        error = new Error('User already exist: ' + JSON.stringify(req.body));
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

friendRouter.route('/addFriend')
    .post(cors.corsWithOptions,)


module.exports = friendRouter;