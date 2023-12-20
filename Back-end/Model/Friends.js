const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    friend_list: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Friend'
    }
},
    {
        timestamps: true
    }
)

var Friends = mongoose.model('Friend',friendSchema);

module.exports = Friends;
